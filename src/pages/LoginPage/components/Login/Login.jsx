import React, { useState } from 'react';

import { useGlobalStateValue } from '../../../../context/GlobalState';
import fire from '../../../../fire';

const Login = () => {
  const [{ login }, dispatch] = useGlobalStateValue();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearErrors = () => {
    if (emailError || passwordError) {
      setEmailError('');
      setPasswordError('');
    }
  };

  const handleEmailChange = event => {
    const { value } = event.target;

    if (emailError) {
      setEmailError('');
    }

    setEmail(value);
  };

  const handlePasswordChange = event => {
    const { value } = event.target;

    if (passwordError) {
      setPasswordError('');
    }

    setPassword(value);
  };

  const handleLogin = () => {
    clearErrors();

    login(email, password)
      .then(res => {
        const { user } = res;

        dispatch({
          type: 'SET_USER',
          payload: {
            user
          }
        });
      })
      .catch(err => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setEmailError(err.message);
            break;
          case 'auth/wrong-password':
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleSignUp = () => {
    clearErrors();

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then()
      .catch(err => {
        switch (err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(err.message);
            break;
          case 'auth/weak-password':
            setPasswordError(err.message);
            break;
        }
      });
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <label>Username</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={handleEmailChange}
        />
        <p className="errorMsg">{emailError}</p>
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <p className="errorMsg">{passwordError}</p>
        <div className="btnContainer">
          {hasAccount ? (
            <>
              <button onClick={handleLogin}>Sign in</button>
              <p>
                Don't have an account?&nbsp;
                <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span>
              </p>
            </>
          ) : (
            <>
              <button onClick={handleSignUp}>Sign up</button>
              <p>
                Have an account?&nbsp;
                <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
