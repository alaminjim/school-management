export interface CreateTaskDataInput {
  title: string;
  link: string;
  text: string;
  time: string;
}

export interface UpdateTaskDataInput {
  link?: string;
  text?: string;
  time?: string;
}