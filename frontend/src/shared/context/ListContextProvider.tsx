import { ReactNode, useReducer } from "react";
import {
  addItemType,
  deleteItemType,
  editItemType,
  setItemStatusType,
} from "../../types/ListCtxTypes";
import listItem from "../../types/listItem";
import useDraggables from "../hooks/useDraggables";
import useList from "../hooks/useList";
import listCtx from "./ListCtx";

const ListContextProvider = ({ children }: { children: ReactNode }) => {
  const { getItems } = useDraggables();
  const { listReducer } = useList();
  const [state, dispatch] = useReducer(listReducer, [
    getItems(0, 10, 0),
    getItems(1, 5, 10),
    getItems(2, 5, 15),
  ]);

  const addItem: addItemType = (
    taskName,
    leader,
    project,
    otherMembers,
    deadLine,
    comment
  ) => {
    dispatch({
      type: "add",
      taskName,
      leader,
      project,
      otherMembers,
      deadLine,
      comment,
    });
  };

  const editItem: editItemType = (
    index,
    id,
    taskName,
    leader,
    project,
    otherMembers,
    status,
    deadLine,
    comment
  ) => {
    dispatch({
      type: "edit",
      index,
      id,
      taskName,
      leader,
      project,
      otherMembers,
      deadLine,
      comment,
      status,
    });
  };

  const deleteItem: deleteItemType = (index, id, status) => {
    dispatch({
      type: "delete",
      index,
      id,
      status,
    });
  };

  const setItemStatus: setItemStatusType = (data, index, id, status) => {
    dispatch({
      type: "setStatus",
      data,
      index,
      id,
      status,
    });
  };

  const setState: (data: listItem[][]) => void = (data) => {
    dispatch({ type: "setState", data });
  };

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
