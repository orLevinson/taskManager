import { createContext } from "react";
import { adminUsersCtxType } from "../../types/AdminTypes";

const adminUsersCtx = createContext<adminUsersCtxType>({
  users: [],
  changeUserRoom: () => {},
  changeUserPrivilege: () => {},
  deleteUser: () => {},
});

export default adminUsersCtx;
