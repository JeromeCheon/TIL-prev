import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = []; // 이렇게 Task 타입의 array라는 것 명시

  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id); // 같은 걸 찾으면 true를 리턴하니까 이렇게 찾을 수 있어.
  }
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      // 자 이제 id를 어떻겍 auto generate 시켜줄까? 다양한 방법이 있겠지만
      // 여기서 우린 uuid라는 걸 install 해서 써보자
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    // 생성하니까 우리 task 리스트에 먼저 넣어주고, 리턴해
    this.tasks.push(task);
    return task;
  }
}
