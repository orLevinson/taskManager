import { createContext } from "react";
import { sectorCtxType } from "../../types/sectorCtxTypes";

const sectorCtx = createContext<sectorCtxType>({
  people: [],
  projects: [],
  setPeople: (_people) => {},
  setProjects: (_projects) => {},
  addProject: (_name) => {},
  editProject: (_name, _oldName) => {},
  deleteProject: (_name) => {},
});

export default sectorCtx;
