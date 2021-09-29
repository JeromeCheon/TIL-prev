// export interface Task {
//   // interface와 class에 관해 강의에서 설명함
//   id: string;
//   title: string;
//   description: string;
//   status: TaskStatus;
// }

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
