import listItem from "./listItem";

export type addItemProperties = {
  taskName: string;
  leader_id: string;
  project_id: string;
  sub_project: string;
  leader_name: string;
  project_name: string;
  giver?: string;
  otherMembers: string[];
  deadLine?: Date | undefined;
  comment?: string | undefined;
  finished_date?: Date | undefined;
};

export type addItemType = (
  taskName: string,
  leader_id: string,
  project_id: string,
  sub_project: string,
  otherMembers: string[],
  deadLine?: Date | undefined,
  comment?: string | undefined,
  giver?: string
) => void;

export type editItemType = (
  index: number,
  id: string,
  taskName: string,
  leader_id: string,
  project_id: string,
  sub_project: string,
  otherMembers: string[],
  status: number,
  deadLine?: Date | undefined,
  comment?: string | undefined,
  giver?: string,
  finished_date?: Date | undefined
) => void;

export type setItemStatusType = (
  data: listItem[][],
  index: number,
  id: string,
  status: number
) => void;

export type deleteItemType = (
  index: number,
  id: string,
  status: number
) => void;

export type listCtxType = {
  data: listItem[][];
  addItem: addItemType;
  editItem: editItemType;
  //   needs to be the new status col
  setItemStatus: setItemStatusType;
  deleteItem: deleteItemType;
  setState: (data: listItem[][]) => void;
};

export type listReducerType = {
  type: "add" | "setStatus" | "edit" | "delete" | "setState";
  index?: number;
  id?: string;
  taskName?: string;
  leader_id?: string;
  leader_name?: string;
  project_name?: string;
  project_id?: string;
  sub_project?: string;
  giver?: string;
  otherMembers?: string[];
  status?: number;
  deadLine?: Date | undefined;
  comment?: string | undefined;
  data?: listItem[][];
  finished_date?: Date | undefined;
};
