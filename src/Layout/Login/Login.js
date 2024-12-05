import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const validateInputs = () => {
    let valid = true;
    if (!email) {
      setEmailError('Vui lòng nhập email');
      valid = false;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu');
      valid = false;
    } else {
      setPasswordError('');
    }
    return valid;
  };

  const handleLogin = async () => {
    if (validateInputs()) {
      try {
        const response = await fetch('http://localhost:8080/loginfull', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('userid', data.user._id);
          if (data.role === 'admin') {
            navigate('/admin');
          } else if (data.role === 'user') {
            // Call the onLoginSuccess prop with user data
            onLoginSuccess(data);
            navigate('/user', { state: { user: data } });
          } else {
            alert(data.message || 'Đăng nhập không thành công');
          }
        } else {
          setLoginError('Đăng nhập không thành công. Vui lòng kiểm tra lại.');
        }
      } catch (error) {
        console.error('Error:', error);
        setLoginError('Lỗi kết nối đến máy chủ. Vui lòng thử lại sau.');
      }
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Đăng nhập</h2>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && <p className="error-message">{emailError}</p>}
      <input
        type="password"
        placeholder="Mật khẩu"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordError && <p className="error-message">{passwordError}</p>}
      {loginError && <p className="error-message">{loginError}</p>}
      <button onClick={handleLogin}>Đăng nhập</button>
      <div className="divfooterdk">
        <p>
          Bạn chưa có tài khoản? <a href="/register">Đăng ký</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
