import listItem from "../../types/listItem";
import { Reducer, useCallback } from "react";
import { listReducerType } from "../../types/ListCtxTypes";

const useList = () => {
  const listReducer: Reducer<listItem[][], listReducerType> = useCallback(
    (state, action) => {
      let clone: listItem[][] = [...state];
      switch (action.type) {
        case "add":
          if (
            action.id !== undefined &&
            action.taskName !== undefined &&
            action.leader_name !== undefined &&
            action.leader_id !== undefined &&
            action.project_name !== undefined &&
            action.project_id !== undefined &&
            action.otherMembers !== undefined &&
            Array.isArray(action.otherMembers)
          )
            clone[1].unshift({
              id: action.id,
              taskName: action.taskName,
              leader_id: action.leader_id,
              leader_name: action.leader_name,
              project_id: action.project_id,
              project_name: action.project_name,
              otherMembers: action.otherMembers,
              status: 1,
              deadLine: action.deadLine,
              comment: action.comment,
            });
          return clone;
          break;
        case "delete":
          if (
            action.index !== undefined &&
            action.status !== undefined &&
            action.id !== undefined
          ) {
            if (clone[action.status]) {
              clone[action.status].splice(action.index, 1);
            }
          }
          return clone;
          break;
        case "edit":
          if (
            action.index !== undefined &&
            action.id !== undefined &&
            action.taskName !== undefined &&
            action.leader_name !== undefined &&
            action.leader_id !== undefined &&
            action.project_name !== undefined &&
            action.project_id !== undefined &&
            action.otherMembers !== undefined &&
            Array.isArray(action.otherMembers) &&
            action.status !== undefined
          ) {
            if (clone[action.status] && clone[action.status][action.index]) {
              clone[action.status][action.index] = {
                ...clone[action.status][action.index],
                taskName: action.taskName,
                leader_id: action.leader_id,
                leader_name: action.leader_name,
                project_id: action.project_id,
                project_name: action.project_name,
                otherMembers: action.otherMembers,
                deadLine: action.deadLine,
                comment: action.comment,
              };
            }
          }
          return clone;
          break;
        case "setStatus":
          if (
            action.data &&
            Array.isArray(action.data) &&
            action.data.length === 3 &&
            action.index !== undefined &&
            action.status !== undefined &&
            action.id !== undefined
          ) {
            if (
              action.data[action.status] &&
              action.data[action.status][action.index]
            ) {
              clone = action.data;
              clone[action.status][action.index].status = action.status;
            }
          }
          return clone;
          break;
        case "setState":
          if (action.data && action.data.length === 3) {
            clone = action.data;
          }
          return clone;
          break;
        default:
          return clone;
          break;
      }
    },
    []
  );

  return { listReducer };
};

export default useList;
