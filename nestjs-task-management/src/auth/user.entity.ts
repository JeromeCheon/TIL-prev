import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  // id는 자동으로 생성하게 하되, uuid 쓸거니 다음과 같이 anotation 남긴다
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) // duplicate 방지목적으로 unique 옵션을 둔다.
  username: string;

  @Column()
  password: string;
}
