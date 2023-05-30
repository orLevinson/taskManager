type listItem = {
  id: string;
  taskName: string;
  leader_id: string;
  leader_name: string;
  project_name: string;
  project_id: string;
  otherMembers: string[];
  deadLine?: Date;
  status: number;
  comment?: string;
};

export default listItem;
