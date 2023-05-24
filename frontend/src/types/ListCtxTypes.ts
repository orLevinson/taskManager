import listItem from "./listItem";

export type addItemProperties = {
  taskName: string;
  leader: string;
  project: string;
  otherMembers: string[];
  deadLine?: Date | undefined;
  comment?: string | undefined;
};

export type addItemType = (
  taskName: string,
  leader: string,
  project: string,
  otherMembers: string[],
  deadLine?: Date | undefined,
  comment?: string | undefined
) => void;

export type editItemType = (
  index: number,
  id: string,
  taskName: string,
  leader: string,
  project: string,
  otherMembers: string[],
  status: number,
  deadLine?: Date | undefined,
  comment?: string | undefined
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
  leader?: string;
  project?: string;
  otherMembers?: string[];
  status?: number;
  deadLine?: Date | undefined;
  comment?: string | undefined;
  data?: listItem[][];
};
