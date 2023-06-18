import { ReactNode, useContext, useEffect, useReducer } from "react";
import {
  addItemType,
  deleteItemType,
  editItemType,
  setItemStatusType,
} from "../../types/ListCtxTypes";
import useHttp from "../hooks/useHttp";
import useList from "../hooks/useList";
import listCtx from "./ListCtx";
import loadingCtx from "./loadingCtx";
import sectorCtx from "./SectorCtx";
import userCtx from "./UserCtx";

const ListContextProvider = ({ children }: { children: ReactNode }) => {
  const { token, room_id } = useContext(userCtx);
  const { projects } = useContext(sectorCtx);
  const { setLoading, setError } = useContext(loadingCtx);
  const { httpHandler } = useHttp();
  const { listReducer } = useList();
  const [state, dispatch] = useReducer(listReducer, [[], [], []]);

  const addItem: addItemType = async (
    taskName,
    leader_id,
    project_id,
    sub_project,
    otherMembers,
    deadLine,
    comment,
    giver
  ) => {
    if (!token || !room_id) {
      return;
    }

    setLoading(true);
    setError(null);
    const response = await httpHandler(
      `${import.meta.env.VITE_BACKEND_URL}/api/messages/${room_id}`,
      "POST",
      {
        task_name: taskName,
        user_id: leader_id + "",
        project_id: project_id + "",
        sub_project: sub_project + " ",
        other_members: otherMembers,
        dead_line: deadLine,
        comment,
        giver,
      },
      {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      }
    );

    if (response && !response.error && response.data) {
      dispatch({
        type: "add",
        id: response.data.added_message[0].message_id,
        taskName,
        leader_id,
        project_id,
        leader_name: response.data.added_message[0].full_name,
        project_name: response.data.added_message[0].project_name,
        sub_project,
        otherMembers,
        deadLine,
        comment,
        giver,
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

  const editItem: editItemType = async (
    index,
    id,
    taskName,
    leader_id,
    project_id,
    sub_project,
    otherMembers,
    status,
    deadLine,
    comment,
    giver,
    finished_date
  ) => {
    if (!token || !room_id) {
      return;
    }

    setLoading(true);
    setError(null);
    const response = await httpHandler(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/messages/${room_id}/values/${id}`,
      "PATCH",
      {
        task_name: taskName,
        user_id: leader_id + "",
        project_id: project_id + "",
        sub_project: sub_project + " ",
        other_members: otherMembers,
        dead_line: deadLine,
        comment,
        giver,
        finished_date,
      },
      {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      }
    );

    if (response && !response.error && response.data) {
      dispatch({
        type: "edit",
        index,
        id,
        taskName,
        leader_id,
        leader_name: response.data.changed_message.full_name,
        project_name: response.data.changed_message.project_name,
        project_id,
        sub_project,
        otherMembers,
        deadLine,
        comment,
        status,
        giver,
        finished_date,
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

  const deleteItem: deleteItemType = async (index, id, status) => {
    if (!token || !room_id) {
      return;
    }

    setLoading(true);
    setError(null);
    const response = await httpHandler(
      `${import.meta.env.VITE_BACKEND_URL}/api/messages/${room_id}/${id}`,
      "DELETE",
      undefined,
      {
        Authorization: `bearer ${token}`,
      }
    );

    if (response && !response.error && response.data) {
      dispatch({
        type: "delete",
        index,
        id,
        status,
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

  const setItemStatus: setItemStatusType = async (data, index, id, status) => {
    if (!token || !room_id) {
      return;
    }

    setLoading(true);
    setError(null);
    const response = await httpHandler(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/messages/${room_id}/status/${id}`,
      "PATCH",
      {
        status,
      },
      {
        Authorization: `bearer ${token}`,
      }
    );

    if (response && !response.error && response.data) {
      dispatch({
        type: "setStatus",
        data,
        index,
        id,
        status,
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

  const setState: () => void = async () => {
    if (!token || !room_id) {
      return;
    }

    setLoading(true);
    setError(null);
    const response = await httpHandler(
      `${import.meta.env.VITE_BACKEND_URL}/api/messages/${room_id}`,
      "GET",
      undefined,
      {
        Authorization: `bearer ${token}`,
      }
    );

    if (response && !response.error && response.data) {
      dispatch({
        type: "setState",
        data: response.data.messages.map((list: any) => {
          return list.map((item: any) => ({
            id: item.message_id,
            taskName: item.task_name,
            leader_id: item.user_id,
            leader_name: item.full_name,
            project_name: item.project_name,
            project_id: item.project_id,
            sub_project: item.sub_project,
            otherMembers: item.other_members,
            deadLine: item.dead_line ? new Date(item.dead_line) : undefined,
            finished_date: item.finished_date ? new Date(item.finished_date) : undefined,
            status: item.status,
            comment: item.comment,
            giver: item.giver,
          }));
        }),
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

  useEffect(() => {
    setState();
  }, [projects]);

  return (
    <listCtx.Provider
      value={{
        data: state,
        addItem,
        editItem,
        setItemStatus,
        deleteItem,
        setState,
      }}
    >
      {children}
    </listCtx.Provider>
  );
};

export default ListContextProvider;
