import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks') // url route
export class TasksController {
  // 이렇게 파라미터를 넣어주면 자동으로 위에 생성이 돼
  constructor(private tasksService: TasksService) {}
  // controller에 다음과 같은 handler를 넣어주는 거야
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }
  // http://localhost:3000.tasks/~~~
  @Get('/:id') // colon은 path 파라미터라는 뜻이야 라는 걸 전달
  getTaskById(@Param('id') id: string): Task {
    // 여기 id는 위에 co relate돼
    return this.tasksService.getTaskById(id);
  }

  // 첫번째 방법
  // @Post()
  // createTask(@Body() body) {
  //   console.log('body', body);
  // }
  @Post()
  createTask(
    // @Body('title') title: string,
    // @Body('description') description: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}
