import { createContext } from "react";
import { UserCtxType } from "../../types/UserTypes";

const userCtx = createContext<UserCtxType>({
  login: async (username, password) => {
    return false;
  },
  register: async (username, password, name) => {
    return false;
  },
  logout: () => {},
});

export default userCtx;
