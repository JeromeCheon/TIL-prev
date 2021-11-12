import { User } from './../auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: TaskStatus;

  // 여기서는 eager를 false를 준다. 
  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  user: User;
}
