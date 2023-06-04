import { createContext } from "react";
import { UserCtxType } from "../../types/UserTypes";

const userCtx = createContext<UserCtxType>({
  login: async (_username, _password) => {
    return false;
  },
  register: async (_username, _password, _name) => {
    return false;
  },
  logout: () => {},
});

export default userCtx;
