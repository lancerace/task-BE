import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import List from "./list"

@Entity()
export default class Task {
    @PrimaryGeneratedColumn()
    taskId: number;

    @Column({ nullable: false })
    name: string;

    @Column()
    description: string;

    @Column({ type: "timestamptz", nullable: true })
    deadline: Date;

    @ManyToOne(type => List)
    @JoinColumn({ name: "listId" })
    list: List;

    @Column()
    listId: number;

    @Column({ default: false })
    completed: boolean;

    @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)", nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ type: "timestamptz", default: null, nullable: true })
    deletedAt: Date;
}