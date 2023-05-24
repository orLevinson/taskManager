import { ReactNode, useReducer } from "react";
import useSector from "../hooks/useSector";
import sectorCtx from "./SectorCtx";

const SectorContextProvider = ({ children }: { children: ReactNode }) => {
  const { Reducer } = useSector();
  const [state, dispatch] = useReducer(Reducer, {
    people: ["אור לוינזון", "ניר סוויסה", "מיטל אביב", "אלעד חן", "פריאל כהן"],
    projects: ["מזון", "היסעים", "משהו"],
  });

  const setPeople = (people: string[]) => {
    dispatch({ type: "setPeople", people });
  };

  const setProjects = (projects: string[]) => {
    dispatch({ type: "setProjects", projects });
  };

  const addProject = (name: string) => {
    dispatch({ type: "addProject", name });
  };

  const editProject = (name: string, oldName: string) => {
    dispatch({ type: "editProject", name, oldName });
  };

  const deleteProject = (name: string) => {
    dispatch({ type: "deleteProject", name });
  };

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
