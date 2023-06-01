export type adminPageUserType = {
  user_id: number;
  room_id?: number | null;
  room_name?: string | null;
  is_admin: boolean;
  full_name: string;
};

export type roomType = {
  room_id: number;
  room_name: string;
};

export type adminUsersCtxType = {
  users: adminPageUserType[];
  changeUserRoom: (user_id: number, room_id: number) => void;
  changeUserPrivilege: (user_id: number, is_admin: boolean) => void;
  deleteUser: (user_id: number) => void;
};

export type adminRoomsCtxType = {
  rooms: roomType[];
  addRoom: (room_name: string) => void;
  changeRoom: (room_id: number, new_name: string) => void;
  deleteRoom: (room_id: number) => void;
};

export type roomsActionType = {
  type: "addRoom" | "setRooms" | "changeRoom" | "deleteRoom";
  rooms?: roomType[];
  name?: string;
  id?: number;
};

export type adminUsersActionType = {
  type: "setUsers" | "changeUserRoom" | "changeUserPrivilege" | "deleteUser";
  users?: adminPageUserType[];
  room_name?: string;
  id?: number;
  is_admin?: boolean;
  room_id?: number;
};
