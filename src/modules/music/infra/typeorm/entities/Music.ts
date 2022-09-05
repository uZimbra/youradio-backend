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
  coverKey!: string;

  @Column()
  musicKey!: string;

  @Column()
  size!: number;

  @Column()
  type!: string;

  @CreateDateColumn()
  created_at!: Date;
}

export { Music };
