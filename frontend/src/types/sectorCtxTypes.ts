export type sectorCtxType = {
  people: { full_name: string; user_id: string }[];
  projects: { project_name: string; project_id: string }[];
  setPeople: (people: string[]) => void;
  setProjects: (projects: string[]) => void;
  addProject: (name: string) => void;
  editProject: (name: string, oldName: string) => void;
  deleteProject: (name: string) => void;
};

export type sectorStateType = {
  people: { full_name: string; user_id: string }[];
  projects: { project_name: string; project_id: string }[];
};

export type sectorActionType = {
  type:
    | "setPeople"
    | "setProjects"
    | "addProject"
    | "deleteProject"
    | "editProject";
  people?: { full_name: string; user_id: string }[];
  projects?: { project_name: string; project_id: string }[];
  name?: string;
  id?: string;
};
