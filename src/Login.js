import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { Button } from 'flowbite-react';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null); // State variable to store user data
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);
  // const [visible, setVisible] = useState(false);

  const tologin = async () => {
    console.log(username);
    console.log(password);
    try {
      const response = await axios.post('https://tribatama.iconicbase.com/restapi/login_web.php', {
        username: username,
        password: password,
      });

      const data = response.data;
      console.log(data);
      if (data.success === true) {
        setUserData(data.user.user_username); // Save user data to state
        localStorage.setItem('userData', JSON.stringify(data.user.user_username)); // Save user data to localStorage
        console.log('Login successful');
        navigate('/rute');
      } else {
        alert('Login failed:', data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="card-container">
      <div className="card">
        <h3 className="card-title">TRIBATAMA</h3>
        <div className="form-container">
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Masukan Username"
            required
          />

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukan Password"
            required
          />

          <Button onClick={tologin}>LOGIN</Button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
