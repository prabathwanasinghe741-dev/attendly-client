import React from 'react'
import { loginUser } from '../services/routes';
import { saveToken } from '../services/session';
import { useNavigate } from 'react-router-dom';
import ErrorNotification from './ErrorNotification';

const LoginForm = () => {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [errorState, setError] = React.useState(null);
  const navigate = useNavigate();

  async function validateForm() {
    if (!email || !password) {
      setError("All the fields are required");
    } else if (password.length < 8) {
      setError("Password must be least at 8 characters");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid Email Address");
    } else {
      const status = await loginUser({ email, password });
      if (status.success) {
        saveToken(status.massage);
        navigate('/educator');
      } else {
        setError(status.error);
      }
    }
  }
  return (
    <div id="auth-form">
      <div style={{ display: (!errorState ? 'none' : "") }}>
        <ErrorNotification error={errorState} />
      </div>
      <div id="input-row">
        <div>
          <label htmlFor="email">Email or Attendly ID</label>
          <input
            type="email"
            placeholder='someone@example.com'
            id='email'
            onChange={(e) => { setEmail(e.target.value); }}
            onPaste={(e) => { e.preventDefault(); }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder='********'
            id='password'
            onChange={(e) => { setPassword(e.target.value); }}
            onPaste={(e) => { e.preventDefault(); }}
          />
        </div>
      </div>
      <div id="input-row">
        <div>
          <button
            onClick={() => { validateForm() }}
          >Login</button>
        </div>
      </div>
    </div>
  )
}

export default LoginForm