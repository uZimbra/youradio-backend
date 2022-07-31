import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
class Music {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  duration!: string;

  @Column()
  path_uri!: string;

  @CreateDateColumn()
  created_at!: Date;
}

export { Music };
