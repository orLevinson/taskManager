import { Reducer, useCallback } from "react";
import { sectorActionType, sectorStateType } from "../../types/sectorCtxTypes";

const useSector = () => {
  const Reducer: Reducer<sectorStateType, sectorActionType> = useCallback(
    (state, action) => {
      let clone: sectorStateType = { ...state };
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
          if (action.name && action.id && action.name.length > 0) {
            clone.projects = clone.projects.map((project) => {
              if (project.project_id === action.id && action.name) {
                return { ...project, project_name: action.name };
              }
              return project;
            });
          }
          break;
        case "addProject":
          if (action.id && action.name && action.name.length > 0) {
            clone.projects.push({
              project_name: action.name,
              project_id: action.id,
            });
          }
          break;
        case "deleteProject":
          if (action.id) {
            clone.projects = clone.projects.filter(
              (project) => project.project_id !== action.id
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
