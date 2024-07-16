import { useAuth } from "../context/Auth.context";
import { serverUrl } from "../../consts";
import { post } from "../helpers/httpHelper";
import AuthContent from "../components/Auth/AuthContent";


export const SignUp = () => {
    const { setUser, setSignInError } = useAuth();

    const onSubmit = async ({email, password}: SignInFields) => {
      setSignInError(undefined);
      const response = await post(`${serverUrl}/auth/register`, {
          email,
          password,
      }) as SignInResponse;
      setUser(response.user);
      setSignInError(response.error);
    };
     
    return (
      <AuthContent onAuthenticate={onSubmit} />
    );
  }