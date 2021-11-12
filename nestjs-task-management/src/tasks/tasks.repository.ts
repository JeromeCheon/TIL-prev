import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    // delete랑 remove가 있는데 delete 추천. code load를 줄여줄 수 있지
    // const found = await this.findOne(id);
    // if (!found) {
    //   throw new NotFoundException(
    //     `Task with ID "${id}" not found and cannot be deleted`,
    //   );
    // }
    // await this.remove(found);
    const result = await this.delete(id);
    // console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Task with ID "${id}" not found and cannot be deleted`,
      );
    }
  }
}