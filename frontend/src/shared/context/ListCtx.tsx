import { createContext } from "react";
import { listCtxType } from "../../types/ListCtxTypes";

const listCtx = createContext<listCtxType>({
  data: [],
  addItem: () => {},
  editItem: () => {},
  setItemStatus: () => {},
  deleteItem: () => {},
  setState: () => {},
});

export default listCtx;
