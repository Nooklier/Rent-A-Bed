import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const isFormValid = () => {
    return (
      email.length > 0 &&
      username.length >= 4 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      password.length >= 6 && 
      confirmPassword.length >= 6 &&
      password === confirmPassword
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true)

    if (!email) return;
    if (!username) return;
    if (!firstName) return;
    if (!lastName) return;
    if (!password) return;
    if (!confirmPassword) return;
    if (password !== confirmPassword) return;

    if (password === confirmPassword) {
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.message) {
            setErrors(data.message);
          }
        });
    }
  };

  return (
    <div className='sign-up-modal'>
      <div className='sign-up-modal-background'>
        <h1 className='sign-up-title'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='sign-up-form-container'>
          
          <input
            placeholder='Email'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          {formSubmitted && email.length === 0 && <p>Email is required</p>}
        
          <input
            placeholder='Username'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
         
          {formSubmitted && username.length < 4 && <p>Username is required and must be at least 4 characters long</p>}
         
          <input
            placeholder='First Name'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          
          {formSubmitted && firstName.length === 0 && <p>First name is required</p>}
        
          <input
            type="text"
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          
          {formSubmitted && lastName.length === 0 && <p>Last name is required</p>}
          
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {formSubmitted && password.length < 6 && <p>Password is required and must be at least 6 characters long</p>}
         
          <input
            type="password"
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
         
          {formSubmitted && (confirmPassword !== password) && (<p>Password must match</p>)}
          <button type="submit" disabled={!isFormValid}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormModal;
          
       
      
         
          

