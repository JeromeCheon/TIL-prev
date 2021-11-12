import { User } from './../auth/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    // const found = await this.tasksRepository.findOne(id);
    // const found = await this.tasksRepository.findOne({where: { id }}); // 위에를 늘리면 다음과 같고, 똑같은 결과 출력
    const found = await this.tasksRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  deleteTask(id: string, user: User): Promise<void> {
    return this.tasksRepository.deleteTask(id, user);
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
  // private tasks: Task[] = []; // 이렇게 Task 타입의 array라는 것 명시

  // typeorm 적용 전
  /*getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    // define a temporary array to hold the result
    let tasks = this.getAllTasks();
    // do something with status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    // do something with search
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    // return final result
    return tasks;
  }
  getTaskById(id: string): Task {

    // try to get task
    const found = this.tasks.find((task) => task.id === id); // 같은 걸 찾으면 true를 리턴하니까 이렇게 찾을 수 있어.

    // if not found, throw an error (404 not found)
    if (!found) {
      // throw new NotFoundException(); 아래 처럼 커스터마이징 할 수도 있다.
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    // otherwise, return the found task
    return found;
  }
  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }
  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
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
  }*/
}
