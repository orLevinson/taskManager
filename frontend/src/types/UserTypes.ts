export type UserCtxType = {
  name?: string | null;
  token?: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (username: string, password: string, name: string) => boolean;
};

export type userStateType = {
  name?: string | null;
  token?: string | null;
};
