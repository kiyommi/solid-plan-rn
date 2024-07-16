import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';

import { serverUrl } from '../../consts';
import { get } from "../helpers/httpHelper";

const initial = {
  isLoginPending: false,
}

export const AuthContext = createContext<AuthContextType>(initial);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | undefined>();
    const [isLoginPending, setLoginPending] = useState(false);
    const [signInError, setSignInError] = useState<string | undefined>();

  const fetchUser = async () => {
    console.log('fetching');
    setLoginPending(true);
    const { user, error } = await get(`${serverUrl}/auth/user`);
    console.log('fetched');
    console.log('user: ', user)
    setLoginPending(false);
    setUser(user);
    setSignInError(error);
  }

  return (
    <AuthContext.Provider
      value={{
        user, isLoginPending, signInError, fetchUser, setUser, setSignInError
      } as ExtendedAuthContext}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as ExtendedAuthContext;

type AuthProviderProps = {
  children: React.ReactNode,
};

type AuthContextType = {
  user?: User,
  isLoginPending?: boolean,
  signInError?: string,
} 

export interface ExtendedAuthContext extends AuthContextType {
  fetchUser: ()=>Promise<void>,
  setUser: Dispatch<SetStateAction<User | undefined>>,
  setSignInError: Dispatch<SetStateAction<string | undefined>>,
}

  