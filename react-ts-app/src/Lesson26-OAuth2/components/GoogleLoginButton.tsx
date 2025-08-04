import { GooglePlusOutlined } from '@ant-design/icons';
import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import { Button } from 'antd';
import { jwtDecode } from 'jwt-decode';

export default function GoogleLoginButton() {
  const googleLogin = useGoogleLogin({
    flow: 'implicit', // 'implicit' || 'auth-code'
    // Dùng implicit flow for access token
    // Dùng auth-code flow để lấy mã xác thực.
    // Sau đó gửi mã này đến server để lấy access token
    // và refresh token nếu cần.
    // Thường dùng trong các ứng dụng cần bảo mật cao.
    // Nếu chỉ cần lấy access token thì dùng implicit flow.
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      // const tokens = await axios.post('http://localhost:3001/auth/google', {
      //   code: codeResponse.code,
      // });

      // console.log(tokens);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      if (credentialResponse.credential) {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log('One-tap login success:', decoded);

        // Lưu user (tuỳ chọn)
        localStorage.setItem('google_user', JSON.stringify(decoded));
      } else {
        console.log('No credential received in one-tap login response.');
      }
    },
    onError: () => {
      console.log('One-tap login failed');
    },
    promptMomentNotification: (notification) => {
      // Tùy chọn – theo dõi quá trình popup
      console.log('Prompt moment:', notification);
    },
  });
  return (
    <div>
      <Button icon={<GooglePlusOutlined />} type="primary" onClick={() => googleLogin()}>
        Google Login
      </Button>
    </div>
  );
}
