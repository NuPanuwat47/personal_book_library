import { useState } from "react";

type RegisterProps = {
  onRegister: (username: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

function Register({ onRegister, isLoading, error }: RegisterProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username.trim() || !password.trim()) {
      return;
    }
    await onRegister(username.trim(), password);
  };

  return (
    <section className="panel">
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="field">
          Username
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
          />
        </label>
        <label className="field">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
        </label>
        <div className="actions">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Register"}
          </button>
        </div>
      </form>
      {error ? <p className="error">{error}</p> : null}
    </section>
  );
}

export default Register;
