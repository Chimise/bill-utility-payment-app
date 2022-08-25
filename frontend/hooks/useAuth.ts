import { useContext } from "react";
import AuthContext from "../store/auth-context";

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("Context must be used with in an AuthContext Provider");
    }
  
    return context;
  };

export default useAuth;