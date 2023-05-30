import { ReactNode, useContext, useEffect, useReducer } from "react";
import useHttp from "../hooks/useHttp";
import useSector from "../hooks/useSector";
import loadingCtx from "./loadingCtx";
import sectorCtx from "./SectorCtx";
import userCtx from "./UserCtx";

const SectorContextProvider = ({ children }: { children: ReactNode }) => {
  const { httpHandler } = useHttp();
  const { token, room_id } = useContext(userCtx);
  const { setLoading, setError } = useContext(loadingCtx);
  const { Reducer } = useSector();
  const [state, dispatch] = useReducer(Reducer, {
    people: [],
    projects: [],
  });

  const setPeople = async () => {
    if (!token || !room_id) {
      return;
    }

    setLoading(true);
    setError(null);
    const response = await httpHandler(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/inroom`,
      "GET",
      undefined,
      {
        Authorization: `bearer ${token}`,
      }
    );

    if (response && !response.error && response.data) {
      dispatch({ type: "setPeople", people: response.data.users });

      console.log(response);

      setLoading(false);

      return true;
    } else {
      if (response && response.error) {
        setError(response.error);
        setLoading(false);
        return false;
      }
    }
  };

  const setProjects = async () => {
    if (!token || !room_id) {
      return;
    }

    setLoading(true);
    setError(null);
    const response = await httpHandler(
      `${import.meta.env.VITE_BACKEND_URL}/api/projects/${room_id}`,
      "GET",
      undefined,
      {
        Authorization: `bearer ${token}`,
      }
    );

    if (response && !response.error && response.data) {
      dispatch({ type: "setProjects", projects: response.data.projects });

      setLoading(false);

      return true;
    } else {
      if (response && response.error) {
        setError(response.error);
        setLoading(false);
        return false;
      }
    }
  };

  const addProject = async (name: string) => {
    if (!token || !room_id) {
      return;
    }

    setLoading(true);
    setError(null);
    const response = await httpHandler(
      `${import.meta.env.VITE_BACKEND_URL}/api/projects/${room_id}`,
      "POST",
      {
        project_name: name,
      },
      {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      }
    );

    if (response && !response.error && response.data) {
      dispatch({
        type: "addProject",
        name,
        id: "" + response.data.new_project[0].project_id,
      });

      setLoading(false);

      return true;
    } else {
      if (response && response.error) {
        setError(response.error);
        setLoading(false);
        return false;
      }
    }
  };

  const editProject = async (name: string, id: string) => {
    if (!token || !room_id) {
      return;
    }

    setLoading(true);
    setError(null);
    const response = await httpHandler(
      `${import.meta.env.VITE_BACKEND_URL}/api/projects/${room_id}/${"" + id}`,
      "PATCH",
      {
        new_name: name,
      },
      {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      }
    );

    if (response && !response.error && response.data) {
      dispatch({
        type: "editProject",
        name,
        id: response.data.changed_project[0].project_id,
      });

      setLoading(false);

      return true;
    } else {
      if (response && response.error) {
        setError(response.error);
        setLoading(false);
        return false;
      }
    }
    setLoading(false);
  };

  const deleteProject = async (id: string) => {
    if (!token || !room_id) {
      return;
    }

    setLoading(true);
    setError(null);
    const response = await httpHandler(
      `${import.meta.env.VITE_BACKEND_URL}/api/projects/${room_id}/${"" + id}`,
      "DELETE",
      undefined,
      {
        Authorization: `bearer ${token}`,
      }
    );

    if (response && !response.error && response.data) {
      dispatch({ type: "deleteProject", id });

      setLoading(false);

      return true;
    } else {
      if (response && response.error) {
        setError(response.error);
        setLoading(false);
        return false;
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    setPeople();
    setProjects();
  }, [token, room_id]);

  return (
    <sectorCtx.Provider
      value={{
        people: state.people,
        projects: state.projects,
        setPeople,
        setProjects,
        addProject,
        editProject,
        deleteProject,
      }}
    >
      {children}
    </sectorCtx.Provider>
  );
};

export default SectorContextProvider;
