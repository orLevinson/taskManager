export type UserCtxType = {
  name?: string | null;
  token?: string | null;
  room_id?: string | null;
  room_name?: string | null;
  is_admin?: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (
    username: string,
    password: string,
    name: string
  ) => Promise<boolean>;
};

export type userStateType = {
  name?: string | null;
  token?: string | null;
  room_id?: string | null;
  room_name?: string | null;
  is_admin?: boolean;
};
