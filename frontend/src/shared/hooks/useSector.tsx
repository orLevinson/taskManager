import { Reducer, useCallback } from "react";
import { sectorActionType, sectorStateType } from "../../types/sectorCtxTypes";

const useSector = () => {
  const Reducer: Reducer<sectorStateType, sectorActionType> = useCallback(
    (state, action) => {
      let clone = { ...state };
      switch (action.type) {
        case "setPeople":
          if (action.people && Array.isArray(action.people)) {
            clone.people = action.people;
          }
          break;
        case "setProjects":
          if (action.projects && Array.isArray(action.projects)) {
            clone.projects = action.projects;
          }
          break;
        case "editProject":
          if (
            action.name &&
            action.oldName &&
            action.oldName.length > 0 &&
            action.name.length > 0
          ) {
            clone.projects = clone.projects.map((project) => {
              if (project === action.oldName && action.name) {
                return action.name;
              }
              return project;
            });
          }
          break;
        case "addProject":
          if (action.name && action.name.length > 0) {
            clone.projects.push(action.name);
          }
          break;
        case "deleteProject":
          if (action.name && action.name.length > 0) {
            clone.projects = clone.projects.filter(
              (project) => project !== action.name
            );
          }
          break;
        default:
          break;
      }
      return clone;
    },
    []
  );

  return { Reducer };
};

export default useSector;
