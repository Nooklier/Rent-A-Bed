
import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useNavigate } from "react-router-dom";
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        closeModal();
        navigate('/');
      })
      // .then(closeModal)    
      .catch(async (res) => {
        const data = await res.json();
        console.log('inside', data)
        if (data && data.message) {
          setErrors([data.message]);
        }
      });
  };

  const handleDemoUser = () => {
    setCredential('Lissandra')
    setPassword('lissandra')
  }

  return (
    <div className='login-container'>
      <div>
        <h1 className='log-in-header'>Log In</h1>
        <div className='invalid-credentials'>
          {errors.map((error, idx) => (
            <div key={idx}>{error}</div>
          ))}
        </div>
        <form className='login-form-container' onSubmit={handleSubmit}>

          <label>
            <input
              type="text"
              placeholder='Username or Email'
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
         
          <label>
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {errors.credential && (
            <p>{errors.credential}</p>
          )}
          {credential.length >= 4 && password.length >= 6 ? 
            <button className='log-in-button' type="submit">Log In</button> : 
            <button className='log-in-button' type="submit" disabled>Log In</button>
          }
         
          <div onClick={handleDemoUser}>Demo User</div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
