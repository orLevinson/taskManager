export type sectorCtxType = {
  people: string[];
  projects: string[];
  setPeople: (people: string[]) => void;
  setProjects: (projects: string[]) => void;
  addProject: (name: string) => void;
  editProject: (name: string, oldName: string) => void;
  deleteProject: (name: string) => void;
};

export type sectorStateType = {
  people: string[];
  projects: string[];
};

export type sectorActionType = {
  type:
    | "setPeople"
    | "setProjects"
    | "addProject"
    | "deleteProject"
    | "editProject";
  people?: string[];
  projects?: string[];
  name?: string;
  oldName?: string;
};
