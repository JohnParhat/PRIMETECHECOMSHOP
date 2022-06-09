import './login.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/apiCalls';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  return (
    <div className='login'>
      <input
        type='text'
        placeholder='username'
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='text'
        placeholder='password'
        onChange={(e) => setpassword(e.target.value)}
      />
      <button onClick={handleClick}>Login</button>
    </div>
  );
};

export default Login;
