import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "@user/user.entity";

@Entity("activity")
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  origin: string;

  @Column()
  details: string;

  @CreateDateColumn()
  createDate?: Date;

  @UpdateDateColumn()
  updateDate?: Date;

  /**
   * relationships
   */
  @ManyToOne(
    () => User,
    user => user.owner,
  )
  @JoinColumn({ name: "ownerId" })
  owner: User;

  @ManyToOne(
    () => User,
    user => user.editor,
  )
  @JoinColumn({ name: "editorId" })
  editor: User;
}
