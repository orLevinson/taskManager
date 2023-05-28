import { createContext } from "react";
import { UserCtxType } from "../../types/UserTypes";

const userCtx = createContext<UserCtxType>({
  login: (username, password) => {
    return false;
  },
  register: (username, password, name) => {
    return false;
  },
  logout: () => {},
});

export default userCtx;
