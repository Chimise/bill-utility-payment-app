import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";

interface AuthContext {
  token: null | string;
  expirationDate: null | number;
  loginHandler: (token: string, expiration: string) => void;
  logoutHandler: () => void;
}

interface User {
  id: string;
  username: string;
}

interface InitialState {
  token: null | string;
  expirationDate: null | number;
}

const AuthContext = React.createContext<AuthContext>({
  token: null,
  expirationDate: null,
  loginHandler: () => {},
  logoutHandler: () => {},
});

const checkDateValidity = (expiration: string): Date | null => {
  const expirationDate = new Date(new Date(expiration).getTime() - Date.now());
  if (expirationDate.getTime() < 10000) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("expirationDate");
    return null;
  }

  return expirationDate;
};

const getInitialState = (): InitialState | null => {
  const authToken = localStorage.getItem("authToken");
  const expirationDate = localStorage.getItem("expirationDate");
  if (!authToken || !expirationDate) {
    return null;
  }

  const validDate = checkDateValidity(expirationDate);

  if (!validDate) {
    return null;
  }
  return {
    token: authToken,
    expirationDate: validDate.getTime(),
  };
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authState, setAuthState] = useState<InitialState>({
    token: null,
    expirationDate: null,
  });
  const timer = useRef<NodeJS.Timeout>();

  const { expirationDate, token } = authState;

  useEffect(() => {
    const initialState = getInitialState();
    if (initialState) {
      setAuthState(initialState);
    }
  }, []);

  const loginHandler = useCallback((token: string, expiration: string) => {
    const expiresIn = parseInt(expiration) * 1000;
    const expirationDate = new Date(new Date().getTime() + expiresIn);

    setAuthState({ token, expirationDate: expiresIn });
    localStorage.setItem("authToken", token);
    localStorage.setItem("expirationDate", expirationDate.toISOString());
  }, []);

  const logoutHandler = useCallback(() => {
    setAuthState({ token: null, expirationDate: null });
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = undefined;
    }
    localStorage.removeItem("authToken");
    localStorage.removeItem("expirationDate");
  }, []);

  useEffect(() => {
    if (expirationDate && token) {
      timer.current = setTimeout(() => {
        logoutHandler();
      }, expirationDate);
    }

    return () => {
      clearTimeout(timer.current!);
    };
  }, [expirationDate, token, logoutHandler]);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        loginHandler: loginHandler,
        logoutHandler: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
