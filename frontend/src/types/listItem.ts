type listItem = {
  id: string;
  taskName: string;
  leader_id: string;
  leader_name: string;
  project_name: string;
  project_id: string;
  sub_project: string;
  giver?: string;
  otherMembers: string[];
  deadLine?: Date;
  finished_date?: Date;
  status: number;
  comment?: string;
};

export default listItem;
