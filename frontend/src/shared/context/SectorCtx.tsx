import { createContext } from "react";
import { sectorCtxType } from "../../types/sectorCtxTypes";

const sectorCtx = createContext<sectorCtxType>({
  people: [],
  projects: [],
  setPeople: (people) => {},
  setProjects: (projects) => {},
  addProject: (name) => {},
  editProject: (name, oldName) => {},
  deleteProject: (name) => {},
});

export default sectorCtx;
