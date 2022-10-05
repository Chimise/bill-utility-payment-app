import React, {
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/router";

import {fetcher} from '../utils';

interface AuthContext {
  token: null | string;
  loginHandler: (token: string, redirect?: boolean, url?: string) => void;
  logoutHandler: () => void;
  isLoading: boolean
}


const AuthContext = React.createContext<AuthContext>({
  token: null,
  loginHandler: () => {},
  logoutHandler: () => {},
  isLoading: true
});



const getToken = (): string | null => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    return null;
  }

  return authToken;
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading]= useState(true);
  const {push} = useRouter();

  useEffect(() => {
    const authToken = getToken();
    if(authToken) {
      fetcher('/users/me', authToken).then((user) => {
        setToken(authToken)
        setIsLoading(false);
      }).catch(err=> {
        setIsLoading(false);
      })
    }
  }, []);

  const loginHandler = useCallback((token: string, redirect: boolean = true, url: string = '/dashboard') => {
    setToken(token);
    localStorage.setItem("authToken", token);
    if(redirect) {
      push(url);
    }
  }, [push]);

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("authToken");
  }, []);

  
  return (
    <AuthContext.Provider
      value={{
        token: token,
        loginHandler: loginHandler,
        logoutHandler: logoutHandler,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
