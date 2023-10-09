import React from 'react';
import './Login.css';
import { TextInput, Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    function tologin()
    {
        navigate('/rute');
    }

  return (
    <div className="login-container" style={{ backgroundColor: 'darkslateblue' }}>
      <div>
        <form>
            <h3 style={{ fontFamily:'inherit',fontWeight:'bold', marginBottom: '10px', textAlign: 'center' }}>SAE TRACK</h3>
            <div>
                <TextInput
                    id="username"
                    placeholder="Masukan Username"
                    required
                    type="text"
                    style={{ width: '300px', height: '40px', marginBottom: '10px', textAlign: 'center' }} // Atur margin-bottom untuk memberikan jarak
                />
                <TextInput
                    id="password"
                    placeholder="Masukan Password"
                    required
                    type="password"
                    style={{ width: '300px', height: '40px', marginBottom: '10px', textAlign: 'center' }}// Tanpa margin karena sudah ada jarak dari input sebelumnya
                />
                <Button 
                    onClick={tologin}
                    style={{ width: '300px', height: '40px', marginBottom: '10px', textAlign: 'center' }}
                >LOGIN</Button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
