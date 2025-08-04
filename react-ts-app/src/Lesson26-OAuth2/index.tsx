import { jwtDecode } from 'jwt-decode';
import React from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { Button } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import GoogleLoginButton from './components/GoogleLoginButton';

export default function GoogleOAuth() {
  const [googleUser, setGoogleUser] = React.useState<any>(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem('google_user');
    if (storedUser) {
      setGoogleUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSuccess = (credentialResponse) => {
    const { credential } = credentialResponse;

    console.log('Credential token:', credential);
    const decoded = jwtDecode(credential);
    console.log('User Info:', decoded);

    // save the token to localStorage or state management
    localStorage.setItem('google_user', JSON.stringify(decoded));
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
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '10px' }}>
        {/* Your application components go here */}
        <h1>Welcome to the OAuth2 Example</h1>
        {googleUser && (
          <>
            <img src={googleUser.picture} alt={googleUser.name} style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
            <button onClick={handleLogout}>Đăng xuất</button>
          </>
        )}
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap />

        <div>
          <GoogleLoginButton />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
