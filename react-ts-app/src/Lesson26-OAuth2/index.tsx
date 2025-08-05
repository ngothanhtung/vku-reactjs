import { jwtDecode } from 'jwt-decode';
import React from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { Button } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import GoogleLoginButton from './components/GoogleLoginButton';
import GoogleLoginManual from './components/GoogleLoginManual';
import axios from 'axios';

export default function GoogleOAuth() {
  const [googleUser, setGoogleUser] = React.useState<any>(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem('google_user');
    if (storedUser) {
      setGoogleUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    // Gửi credential lên back end server để xác thực và lấy thông tin user, xử lý đăng nhập

    console.log('Credential token:', credential);
    const decoded: any = jwtDecode(credential);
    console.log('User Info:', decoded);

    const emailFromGoogle = decoded.email;
    console.log('Email from Google:', emailFromGoogle);

    // Send to BackEnd to get access token and refresh token
    const response = await axios.post('http://localhost:8080/api/auth/google-login', {
      email: emailFromGoogle,
    });

    console.log('Response from server:', response.data);

    // save the token to localStorage or state management
    localStorage.setItem('google_user', JSON.stringify(decoded));

    // Thông tin user đăng nhập dc tại GOOGLE
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  const handleLogout = () => {
    localStorage.removeItem('google_user');
    setGoogleUser(null);
    console.log('User logged out');
  };

  // useGoogleLogin({
  //   onSuccess: handleSuccess,
  //   onError: handleError,
  // });

  return (
    <React.Fragment>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '10px' }}>
          <h1>Welcome to the OAuth2 Example</h1>
          {googleUser && (
            <>
              <img src={googleUser.picture} alt={googleUser.name} style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
              <button onClick={handleLogout}>Đăng xuất</button>
            </>
          )}
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />

          <div>
            <GoogleLoginButton />
          </div>
        </div>
      </GoogleOAuthProvider>
      {/* <GoogleLoginManual /> */}
    </React.Fragment>
  );
}
