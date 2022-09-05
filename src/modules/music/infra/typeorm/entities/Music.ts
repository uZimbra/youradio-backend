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
  duration!: number;

  @Column()
  coverUri!: string;

  @Column()
  musicKey!: string;

  @Column()
  size!: number;

  @Column()
  type!: string;

  @CreateDateColumn()
  createdAt!: Date;
}

export { Music };
