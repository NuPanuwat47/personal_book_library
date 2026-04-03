import { Link, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import Login from './components/Login';
import Register from './components/Register';
import { useAuth } from './hooks/useAuth';
import { useBooks } from './hooks/useBooks';

function App() {
  const auth = useAuth();
  const booksState = useBooks(
    auth.token,
    auth.getTokenOrRedirect,
    auth.handleUnauthorized,
  );

  const loginView = (
    <div className="auth-panel">
      <Login
        onLogin={auth.handleLogin}
        isLoading={auth.authLoading}
        error={auth.loginError}
      />
      <div className="auth-switch">
        <Link to="/register" onClick={auth.clearNotice}>
          Create account
        </Link>
      </div>
      {auth.authNotice ? <p className="notice">{auth.authNotice}</p> : null}
    </div>
  );

  const registerView = (
    <div className="auth-panel">
      <Register
        onRegister={auth.handleRegister}
        isLoading={auth.authLoading}
        error={auth.registerError}
      />
      <div className="auth-switch">
        <Link to="/login" onClick={auth.clearNotice}>
          Back to login
        </Link>
      </div>
    </div>
  );

  const libraryView = (
    <>
      <BookForm onAddBook={booksState.addBook} isLoading={booksState.mutating} />
      <BookList
        books={booksState.books}
        totalBooks={booksState.totalBooks}
        onDeleteBook={booksState.deleteBook}
        isLoading={booksState.booksLoading || booksState.mutating}
      />
      {booksState.error ? <p className="error">{booksState.error}</p> : null}
    </>
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Personal Book Library</h1>
        {auth.token ? (
          <button type="button" onClick={auth.handleLogout}>
            Logout
          </button>
        ) : null}
      </header>

      <Routes>
        <Route
          path="/"
          element={auth.token ? libraryView : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={!auth.token ? loginView : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!auth.token ? registerView : <Navigate to="/" replace />}
        />
        <Route
          path="*"
          element={<Navigate to={auth.token ? '/' : '/login'} replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
