import { useAuth } from "../context/Auth.context";

import { post } from "../helpers/httpHelper";
import { serverUrl } from "../../consts";
import AuthContent from "../components/Auth/AuthContent";

export const SignIn = () => {

  const { setUser, setSignInError } = useAuth();

  const onSubmit = async ({email, password}: SignInFields) => {
    setSignInError(undefined);
    const response = await post(`${serverUrl}/auth/login`, {
        email,
        password,
    }) as SignInResponse;
    setUser(response.user);
    setSignInError(response.error);
  };

  return (
    <AuthContent isLogin onAuthenticate={onSubmit} />
  );
}

