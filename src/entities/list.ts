import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Task from "./task";

@Entity()
export default class List {
    @PrimaryGeneratedColumn()
    listId: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(type => Task, task => task.list, { cascade: ['soft-remove'] })
    tasks: Task[];

    @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)", nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ type: "timestamptz", default: null, nullable: true })
    deletedAt: Date;
}