import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { ListService } from '../services';
import { List, Task } from '../entities';
import DataSource from '../utils/datasource';

async function updateTasks(taskId: number, fields: { name?: string, description?: string, deadline?: Date, listId?: number }): Promise<boolean> {
    const result: UpdateResult = await DataSource
        .createQueryBuilder()
        .update(Task)
        .set({ ...fields })
        .where("taskId = :taskId", { taskId })
        .execute()
    return (result.affected > 0);
}

async function createTask(listId: number, fields: { name?: string, description?: string, deadline?: Date }): Promise<Task> {
    const list: List = await ListService.getList(listId);
    if (!list)
        throw new Error(`list id ${listId} is invalid`);

    const result: InsertResult = await DataSource
        .createQueryBuilder()
        .insert()
        .into(Task)
        .values([{ ...fields, listId }])
        .execute();
    return result.raw[0];
}

async function completeTask(taskId: number): Promise<boolean> {
    const result: UpdateResult = await DataSource
        .createQueryBuilder()
        .update(Task)
        .set({ completed: true })
        .where("taskId = :taskId", { taskId })
        .execute();

    return (result.affected > 0);

}

async function getTask(taskId: number): Promise<Task> {

    return DataSource
        .getRepository(Task)
        .createQueryBuilder('task')
        .select(['task.taskId AS "taskId"', 'task.name AS "name"'])
        .where("task.taskId = :taskId", { taskId })
        .getRawOne();
}

async function deleteTask(taskId: number): Promise<boolean> {

    const task: Task = await getTask(taskId);

    if (!task)
        throw new Error(`Invalid taskId ${taskId}`);


    const deleted: DeleteResult = await DataSource.getRepository(Task).createQueryBuilder()
        .softDelete()
        .where("taskId = :taskId", { taskId }).execute();

    return (deleted.affected > 0) ? true : false;
}

async function deleteTasks(taskIds: number[]): Promise<boolean> {

    const deleted: DeleteResult = await DataSource.getRepository(Task).createQueryBuilder()
        .softDelete()
        .where("taskId IN (:...taskIds)", { taskIds }).execute();

    return (deleted.affected > 0) ? true : false;
}

export default { deleteTask, deleteTasks, completeTask, createTask, updateTasks }