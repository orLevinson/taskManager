import { ReactNode, Reducer, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { roomsActionType, roomType } from "../../types/AdminTypes";
import useHttp from "../hooks/useHttp";
import loadingCtx from "./loadingCtx";
import roomsCtx from "./RoomCtx";
import userCtx from "./UserCtx";

const reducer: Reducer<roomType[], roomsActionType> = (state, action) => {
  let clone: roomType[] = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "addRoom":
      if (action.id !== null && action.id !== undefined && action.name) {
        clone.push({
          room_id: action.id,
          room_name: action.name,
        });
      }
      break;
    case "changeRoom":
      if (action.id !== null && action.id !== undefined && action.name) {
        clone = clone.map((item) => {
          if (item.room_id === action.id && action.name) {
            return { ...item, room_name: action.name };
          }
          return item;
        });
      }
      break;
    case "deleteRoom":
      if (action.id !== null && action.id !== undefined) {
        clone = clone.filter((item) => item.room_id !== action.id);
      }
      break;
    case "setRooms":
      if (action.rooms) {
        clone = action.rooms;
      }
      break;
    default:
      return state;
  }
  return clone;
};

const RoomContextProvider = ({ children }: { children: ReactNode }) => {
  const [rooms, dispatchRooms] = useReducer(reducer, []);
  const { httpHandler } = useHttp();
  const { setLoading, setError } = useContext(loadingCtx);
  const { token, is_admin, room_id } = useContext(userCtx);
  const navigate = useNavigate();

  const addRoom = async (room_name: string) => {
    if (!token || !is_admin) {
      return;
    }

    setLoading(true);
    setError(null);
    const response = await httpHandler(
      `${import.meta.env.VITE_BACKEND_URL}/api/rooms`,
      "POST",
      {
        room_name,
      },
      {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      }
    );

    if (response && !response.error && response.data) {
      dispatchRooms({
        type: "addRoom",
        id: response.data.new_room[0].room_id,
        name: room_name,
      });

      setLoading(false);
    } else {
      if (response && response.error) {
        setError(response.error);
        setLoading(false);
      }
    }
  };

  const changeRoom = async (room_id: number, new_name: string) => {
    if (!token || !is_admin) {
      return;
    }

    setLoading(true);
    setError(null);
    const response = await httpHandler(
      `${import.meta.env.VITE_BACKEND_URL}/api/rooms/${room_id}`,
      "PATCH",
      {
        new_name,
      },
      {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      }
    );

    if (response && !response.error && response.data) {
      dispatchRooms({ type: "changeRoom", id: room_id, name: new_name });

      setLoading(false);
    } else {
      if (response && response.error) {
        setError(response.error);
        setLoading(false);
      }
    }
  };

  const deleteRoom = async (room_id: number) => {
    if (!token || !is_admin) {
      return;
    }

    setLoading(true);
    setError(null);
    const response = await httpHandler(
      `${import.meta.env.VITE_BACKEND_URL}/api/rooms/${room_id}`,
      "DELETE",
      undefined,
      {
        Authorization: `bearer ${token}`,
      }
    );

    if (response && !response.error && response.data) {
      dispatchRooms({ type: "deleteRoom", id: room_id });

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
      `${import.meta.env.VITE_BACKEND_URL}/api/rooms`,
      "GET",
      undefined,
      {
        Authorization: `bearer ${token}`,
      }
    );

    if (response && !response.error && response.data) {
      dispatchRooms({ type: "setRooms", rooms: response.data.rooms });

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
      dispatchRooms({ type: "setRooms", rooms: [] });
      if (token && room_id) {
        navigate("/");
      } else {
        navigate("/auth");
      }
    }
  }, [token, is_admin]);

  return (
    <roomsCtx.Provider
      value={{
        rooms,
        addRoom,
        changeRoom,
        deleteRoom,
      }}
    >
      {children}
    </roomsCtx.Provider>
  );
};

export default RoomContextProvider;
