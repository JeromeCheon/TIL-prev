import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
@Injectable()
export class TasksService {
  private tasks: Task[] = []; // 이렇게 Task 타입의 array라는 것 명시

  getAllTasks() {
    return this.tasks;
  }
}
