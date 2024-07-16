import { useAuth } from "../context/Auth.context";

import { post } from "../helpers/httpHelper";
import { serverUrl } from "../../consts";
import AuthContent from "../components/Auth/AuthContent";

export const SignIn = () => {

  const { setUser, setSignInError } = useAuth();

  const onSubmit = async ({email, password}: SignInFields) => {
    console.log('signing in');
    setSignInError(undefined);
    const response = await post(`${serverUrl}/auth/login`, {
        email,
        password,
    }) as SignInResponse;
    console.log('logged in');
    setUser(response.user);
    setSignInError(response.error);
  };

  return (
    <AuthContent isLogin onAuthenticate={onSubmit} />
  );
}

