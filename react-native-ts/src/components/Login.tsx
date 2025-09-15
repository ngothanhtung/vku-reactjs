import React from 'react';
import { Image, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
type Props = {};

const URL = 'https://server.aptech.io/auth/login';

const Login = (props: Props) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        Alert.alert('Login Successful', `Welcome back, ${data.loggedInUser.fullName}!`);
      } else {
        Alert.alert('Login Failed');
      }
    } catch (error) {
      Alert.alert('Error occurred during login');
    }
  };

  return (
    <SafeAreaView edges={['top', 'left']} style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/Logo/eatme.png')} style={styles.logo} />
        <Text style={styles.title}>Let’s Sign You In</Text>

        <Text style={styles.subTitle}>Welcome back, you’ve been missed!</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={(value) => {
              setUsername(value);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={(value) => {
              setPassword(value);
            }}
          />
        </View>

        <View style={styles.loginButtonContainer}>
          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
        </View>

        <View style={styles.socialLoginButtonContainer}>
          <Pressable style={styles.facebookButton}>
            <Image source={require('../assets/Logo/Social/facebook.png')} style={styles.socialIcon} />
            <Text style={styles.buttonText}>Continue With Facebook</Text>
          </Pressable>
          <Pressable style={styles.googleButton}>
            <Image source={require('../assets/Logo/Social/google.png')} style={styles.socialIcon} />
            <Text style={styles.googleButtonText}>Continue With Google</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerContainer: {
    marginTop: 48,
    alignItems: 'center',
  },

  title: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },

  subTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 24,
    color: '#525C67',
  },

  logo: {
    height: 60,
    width: 190,
    marginTop: 48,
  },

  formContainer: {
    marginTop: 40,
    gap: 16,
  },

  inputContainer: {
    paddingHorizontal: 24,
    gap: 8,
  },
  label: {
    color: '#525C67',
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    height: 56,
    paddingHorizontal: 24,
    backgroundColor: '#f5f5f8',
    borderRadius: 8,
    borderColor: '#e4e4e4',
    borderWidth: 1,
  },

  loginButtonContainer: {
    marginTop: 40,
    paddingHorizontal: 24,
  },

  button: {
    height: 56,
    backgroundColor: '#FF6C44',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  socialLoginButtonContainer: {
    marginTop: 16,
    paddingHorizontal: 24,
    gap: 16,
  },
  facebookButton: {
    flexDirection: 'row',
    gap: 10,
    height: 56,
    backgroundColor: '#0064C0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  googleButton: {
    flexDirection: 'row',
    gap: 10,
    height: 56,
    backgroundColor: '#f5f5f8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  googleButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },

  socialIcon: {
    width: 16,
    height: 16,
  },
});
