import { Body, Controller, Get, Post } from '@nestjs/common';
import { title } from 'process';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  // 이렇게 파라미터를 넣어주면 자동으로 위에 생성이 돼
  constructor(private tasksService: TasksService) {}
  // controller에 다음과 같은 handler를 넣어주는 거야
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  // 첫번째 방법
  // @Post()
  // createTask(@Body() body) {
  //   console.log('body', body);
  // }
  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.createTask(title, description);
  }
}
