import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import AuthForm from './AuthForm';
import { Colors } from '../../constants/styles';
import Button from '../controlls/Button';
import { useAuth } from '../../context/Auth.context';

function AuthContent({ isLogin, onAuthenticate }: AuthContentProps) {
    const { signInError, setSignInError} = useAuth();
    const navigation = useNavigation<AuthScreenNavigationProp>();  

    const [credentialsInvalid, setCredentialsInvalid] = useState({
        email: false,
        password: false,
        confirmEmail: false,
        confirmPassword: false,
    });

    function switchAuthModeHandler() {
        setSignInError(undefined);
        if (isLogin) {
            navigation.replace('SignUp');
        } else {
            navigation.replace('SignIn');
        }
    }

  function submitHandler(credentials: Credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        isCredentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <Button onPress={switchAuthModeHandler} isFlat>
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </Button>
      </View>
      <Text style={styles.error}>{signInError}</Text>
    </View>
  );
}

export default AuthContent;

type AuthContentProps = {
    isLogin?: boolean,
    onAuthenticate: (credentials: BaseCredentials) => void,
}

type AuthScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
  error: {
    color: 'red',
    fontWeight: '600',
  }
});