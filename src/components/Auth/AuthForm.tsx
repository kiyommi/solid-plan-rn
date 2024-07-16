import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../controlls/Button';
import Input from '../controlls/Input';

function AuthForm({ isLogin, onSubmit, isCredentialsInvalid }: AuthFormProps) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = isCredentialsInvalid;

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Email Address"
          onUpdateValue={setEnteredEmail}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Email Address"
            onUpdateValue={setEnteredConfirmEmail}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
          />
        )}
        <Input
          label="Password"
          onUpdateValue={setEnteredPassword}
          isSecure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            onUpdateValue={setEnteredConfirmPassword}
            isSecure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

type AuthFormProps = {
    isLogin: boolean | undefined,
    onSubmit: (credentials: Credentials) => void, 
    isCredentialsInvalid: CredentialValidations,
}

type CredentialValidations = {
    email: boolean,
    confirmEmail: boolean,
    password: boolean,
    confirmPassword: boolean,
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
  form: {

  }
});