import { ReactNode, Reducer, useContext, useEffect, useReducer } from "react";
import {
  adminPageUserType,
  adminUsersActionType,
} from "../../types/AdminTypes";
import useHttp from "../hooks/useHttp";
import loadingCtx from "./loadingCtx";
import adminUsersCtx from "./adminUsersCtx";
import userCtx from "./UserCtx";

const reducer: Reducer<adminPageUserType[], adminUsersActionType> = (
  state,
  action
) => {
  let clone: adminPageUserType[] = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "changeUserRoom":
      if (
        action.id !== null &&
        action.id !== undefined &&
        action.room_id !== undefined &&
        action.room_id !== null &&
        action.room_name
      ) {
        clone = clone.map((item) => {
          if (
            item.room_id === action.id &&
            action.room_id !== undefined &&
            action.room_id !== null &&
            action.room_name
          ) {
            return {
              ...item,
              room_id: action.room_id,
              room_name: action.room_name,
            };
          }
          return item;
        });
      }
      break;
    case "changeUserPrivilege":
      if (
        action.id !== null &&
        action.id !== undefined &&
        action.is_admin !== undefined
      ) {
        clone = clone.map((item) => {
          if (item.room_id === action.id && action.is_admin !== undefined) {
            return { ...item, is_admin: action.is_admin };
          }
          return item;
        });
      }
      break;
    case "deleteUser":
      if (action.id !== null && action.id !== undefined) {
        clone = clone.filter((item) => item.user_id !== action.id);
      }
      break;
    case "setUsers":
      if (action.users) {
        clone = action.users;
      }
      break;
    default:
      return state;
  }
  return clone;
};

const AdminUsersContextProvider = ({ children }: { children: ReactNode }) => {
  const [users, dispatchUsers] = useReducer(reducer, []);
  const { httpHandler } = useHttp();
  const { setLoading, setError } = useContext(loadingCtx);
  const { token, is_admin } = useContext(userCtx);

  const changeUserRoom = async (user_id: number, room_id: number) => {
    if (!token || !is_admin) {
      return;
    }

    setLoading(true);
    setError(null);
    const response = await httpHandler(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/room/${user_id}`,
      "PATCH",
      {
        room_id: "" + room_id,
      },
      {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      }
    );

    if (response && !response.error && response.data) {
      dispatchUsers({
        type: "changeUserRoom",
        id: response.data.changed_user.user_id,
        room_id: response.data.changed_user.room_id,
        room_name: response.data.changed_user.room_name,
      });

      setLoading(false);
    } else {
      if (response && response.error) {
        setError(response.error);
        setLoading(false);
      }
    }
  };

  const changeUserPrivilege = async (
    user_id: number,
    is_admin_parameter: boolean
  ) => {
    if (!token || !is_admin) {
      return;
    }

    setLoading(true);
    setError(null);
    const response = await httpHandler(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/privileges/${user_id}`,
      "PATCH",
      {
        is_admin: is_admin_parameter,
      },
      {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      }
    );

    if (response && !response.error && response.data) {
      dispatchUsers({
        type: "changeUserPrivilege",
        id: response.data.changed_user.user_id,
        is_admin: response.data.changed_user.is_admin,
      });

      setLoading(false);
    } else {
      if (response && response.error) {
        setError(response.error);
        setLoading(false);
      }
    }
  };

  const deleteUser = async (user_id: number) => {
    if (!token || !is_admin) {
      return;
    }

    setLoading(true);
    setError(null);
    const response = await httpHandler(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/${user_id}`,
      "DELETE",
      undefined,
      {
        Authorization: `bearer ${token}`,
      }
    );

    if (response && !response.error && response.data) {
      dispatchUsers({
        type: "deleteUser",
        id: user_id,
      });

      setLoading(false);
    } else {
      if (response && response.error) {
        setError(response.error);
        setLoading(false);
      }
    }
  };

  const initializeValues = async () => {
    if (!token || !is_admin) {
      return;
    }

    setLoading(true);
    setError(null);
    const response = await httpHandler(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/`,
      "GET",
      undefined,
      {
        Authorization: `bearer ${token}`,
      }
    );

    if (response && !response.error && response.data) {
      dispatchUsers({
        type: "setUsers",
        users: response.data.users,
      });

      setLoading(false);
    } else {
      if (response && response.error) {
        setError(response.error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (is_admin) {
      initializeValues();
    } else {
      dispatchUsers({ type: "setUsers", users: [] });
    }
  }, [token, is_admin]);

  return (
    <adminUsersCtx.Provider
      value={{
        users,
        changeUserRoom,
        changeUserPrivilege,
        deleteUser,
      }}
    >
      {children}
    </adminUsersCtx.Provider>
  );
};

export default AdminUsersContextProvider;
