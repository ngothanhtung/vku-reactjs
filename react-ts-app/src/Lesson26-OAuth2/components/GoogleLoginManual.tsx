/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
  clientId: string;
}

interface JwtPayload {
  name?: string;
  email?: string;
  picture?: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (options: { client_id: string; callback: (response: GoogleCredentialResponse) => void; cancel_on_tap_outside?: boolean }) => void;
          renderButton: (parent: HTMLElement | null, options: { theme: string; size: string }) => void;
          prompt: () => void;
        };
      };
    };
  }
}

function GoogleLoginManual() {
  const initialized = useRef(false); // đảm bảo chỉ init một lần

  const handleCredentialResponse = (response: GoogleCredentialResponse): void => {
    const token: string = response.credential;
    console.log('Google Token:', token);

    const payload: JwtPayload = parseJwt(token);
    console.log('Decoded user:', payload);
  };

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      cancel_on_tap_outside: false, // để giữ popup khi click ngoài
    });

    window.google.accounts.id.renderButton(document.getElementById('google-login-button'), { theme: 'outline', size: 'large' });

    // bật Google One Tap Login
    window.google.accounts.id.prompt();
  }, []);

  const parseJwt = (token: string): JwtPayload => {
    return JSON.parse(atob(token.split('.')[1])) as JwtPayload;
  };

  return <div id="google-login-button"></div>;
}

export default GoogleLoginManual;
