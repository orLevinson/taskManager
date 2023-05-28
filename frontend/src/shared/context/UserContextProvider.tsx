import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStateType } from "../../types/UserTypes";
import userCtx from "./UserCtx";

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<userStateType>({
    name: null,
    token: null,
  });
  const navigate = useNavigate();

  const login = (username: string, password: string) => {
    if (username.length >= 6 && password.length >= 6) {
      setAuth({
        name: "hi",
        token: "yay",
      });
      navigate("/");
      return true;
    }
    return false;
  };

  const register = (username: string, password: string, name: string) => {
    if (
      username.length >= 6 &&
      password.length >= 6 &&
      name.split(" ").length > 1
    ) {
      setAuth({
        name: "hi",
        token: "yay",
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuth({
      name: null,
      token: null,
    });
    navigate("/auth");
  };

  return (
    <userCtx.Provider
      value={{
        name: auth.name,
        token: auth.token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </userCtx.Provider>
  );
};

export default UserContextProvider;
