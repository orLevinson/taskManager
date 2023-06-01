import { createContext } from "react";
import { adminRoomsCtxType } from "../../types/AdminTypes";

const roomsCtx = createContext<adminRoomsCtxType>({
  rooms: [],
  addRoom: () => {},
  changeRoom: () => {},
  deleteRoom: () => {},
});

export default roomsCtx;
