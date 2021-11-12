import { Task } from 'src/tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  // id는 자동으로 생성하게 하되, uuid 쓸거니 다음과 같이 anotation 남긴다
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) // duplicate 방지목적으로 unique 옵션을 둔다.
  username: string;

  @Column()
  password: string;

  // database의 entity relationship 관련해서 mapping 데코레이터 넣어주는 것
  // eager 뜻은 찾아봐!
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
