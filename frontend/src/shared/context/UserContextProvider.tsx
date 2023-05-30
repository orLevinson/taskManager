import { ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStateType } from "../../types/UserTypes";
import useHttp from "../hooks/useHttp";
import loadingCtx from "./loadingCtx";
import userCtx from "./UserCtx";

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const { httpHandler } = useHttp();
  const { setLoading, setError } = useContext(loadingCtx);
  const [auth, setAuth] = useState<userStateType>({
    name: null,
    token: null,
    room_id: null,
    room_name: null,
  });
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    if (username.length >= 6 && password.length >= 6) {
      setLoading(true);
      setError(null);
      const response = await httpHandler(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        "POST",
        {
          username,
          password,
        },
        {
          "Content-Type": "application/json",
        }
      );

      if (response && !response.error && response.data) {
        setAuth({
          name: response.data.userData.name,
          token: response.data.userData.token,
          room_id: response.data.userData.room_id,
          room_name: response.data.userData.room_name,
          is_admin: response.data.userData.is_admin,
        });

        const today = new Date();
        const expirationTime = today.getTime() + 7 * 24 * 60 * 60 * 1000;

        localStorage.setItem("token", response.data.userData.token);
        localStorage.setItem("expiration", "" + expirationTime);

        const room_id = response.data.userData.room_id;

        setLoading(false);

        console.log(room_id);
        if (room_id) {
          navigate("/");
        } else {
          setError("הינך רשומ/ה למערכת אך יש להמתין לאישור מנהל");
        }

        return true;
      } else {
        if (response && response.error) {
          setError(response.error);
        }
      }
    }
    setLoading(false);
    return false;
  };

  const register = async (username: string, password: string, name: string) => {
    if (
      username.length >= 6 &&
      password.length >= 6 &&
      name.split(" ").length > 1
    ) {
      setLoading(true);
      setError(null);
      const response = await httpHandler(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        "POST",
        {
          username,
          password,
          fullname: name,
        },
        {
          "Content-Type": "application/json",
        }
      );

      if (response && !response.error && response.data) {
        setLoading(false);

        return true;
      } else {
        if (response && response.error) {
          console.log(response.error);
          setError(response.error);
        }
      }
    }
    setLoading(false);
    return false;
  };

  const logout = () => {
    setAuth({
      name: null,
      token: null,
    });
    localStorage.clear();
    navigate("/auth");
  };

  // check token and get data from localstorage
  useEffect(() => {
    const onRefresh = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const expiration = localStorage.getItem("expiration");

      const today = new Date();
      if (!expiration || !token || today.getTime() > parseInt(expiration)) {
        localStorage.clear();
        setLoading(false);
        navigate("/auth");
        return;
      }

      const validateToken = async () => {
        const response = await httpHandler(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/check`,
          "GET",
          undefined,
          {
            Authorization: `bearer ${token}`,
          }
        );
        if (response && !response.error && response.data) {
          return response.data.userData;
        } else {
          if (response && response.error) {
            setError(response.error);
            return;
          }
        }
        return;
      };

      const result = await validateToken();

      if (!result) {
        localStorage.clear();
        setLoading(false);
        navigate("/auth");
        return;
      }

      setAuth({
        name: result.name,
        token,
        room_id: result.room_id,
        room_name: result.room_name,
        is_admin: result.is_admin,
      });

      if (result.room_id) {
        navigate("/");
      } else {
        navigate("/auth");
        setError("הינך רשומ/ה למערכת אך יש להמתין לאישור מנהל");
      }

      setTimeout(() => {
        logout();
      }, parseInt(expiration) - today.getTime());

      setLoading(false);
    };
    onRefresh();
  }, []);

  return (
    <userCtx.Provider
      value={{
        name: auth.name,
        token: auth.token,
        room_id: auth.room_id,
        room_name: auth.room_name,
        is_admin: auth.is_admin,
        login,
        register,
        logout,
      }}
    >
      {children}
    </userCtx.Provider>
  );
};

export default UserContextProvider;
