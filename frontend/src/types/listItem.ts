type listItem = {
  id: string;
  taskName: string;
  leader: string;
  project: string;
  otherMembers: string[];
  deadLine?: Date;
  status: number;
  comment?: string;
};

export default listItem;
