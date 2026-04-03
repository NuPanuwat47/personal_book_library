import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../utils/errors';
import { API_BASE_URL } from '../api/config';

type AuthResult = {
  token: string | null;
  authLoading: boolean;
  loginError: string | null;
  registerError: string | null;
  authNotice: string | null;
  handleLogin: (username: string, password: string) => Promise<void>;
  handleRegister: (username: string, password: string) => Promise<void>;
  handleLogout: () => void;
  handleUnauthorized: () => void;
  clearNotice: () => void;
  getTokenOrRedirect: () => string | null;
};


export const useAuth = (): AuthResult => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('token'),
  );
  const [authLoading, setAuthLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [authNotice, setAuthNotice] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      setToken(null);
    }
  }, []);

  const handleUnauthorized = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setLoginError(null);
    setRegisterError(null);
    setAuthNotice('Session expired. Please log in again.');
    navigate('/login', { replace: true });
  }, [navigate]);

  const getTokenOrRedirect = useCallback(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      handleUnauthorized();
      return null;
    }
    if (storedToken !== token) {
      setToken(storedToken);
    }
    return storedToken;
  }, [handleUnauthorized, token]);

  const handleLogin = async (username: string, password: string) => {
    setAuthLoading(true);
    setLoginError(null);
    setRegisterError(null);
    setAuthNotice(null);
    try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error('Login failed.');
      }
      const data = await response.json();
      const newToken = data?.token;
      if (!newToken) {
        throw new Error('Missing token in response.');
      }
      localStorage.setItem('token', newToken);
      setToken(newToken);
      navigate('/', { replace: true });
    } catch (err) {
      setLoginError(getErrorMessage(err, 'Login failed.'));
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async (username: string, password: string) => {
    setAuthLoading(true);
    setRegisterError(null);
    setLoginError(null);
    setAuthNotice(null);
    try {
        const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error('Registration failed.');
      }
      if (response.status !== 201) {
        throw new Error('Registration did not return 201.');
      }
      setAuthNotice('Registration successful. Please log in.');
      navigate('/login', { replace: true });
    } catch (err) {
      setRegisterError(getErrorMessage(err, 'Registration failed.'));
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setLoginError(null);
    setRegisterError(null);
    setAuthNotice(null);
    navigate('/login', { replace: true });
  };

  const clearNotice = () => setAuthNotice(null);

  return {
    token,
    authLoading,
    loginError,
    registerError,
    authNotice,
    handleLogin,
    handleRegister,
    handleLogout,
    handleUnauthorized,
    clearNotice,
    getTokenOrRedirect,
  };
};
