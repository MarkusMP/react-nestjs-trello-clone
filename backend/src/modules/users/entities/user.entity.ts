import { Exclude } from 'class-transformer';
import { Board } from '../../boards/entities/board.entity';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column('varchar')
  @Exclude()
  password: string;

  @Column({ default: '' })
  photo: string;

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
