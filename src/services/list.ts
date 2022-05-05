import { DeleteResult, InsertResult } from 'typeorm';
import List from '../entities/list';
import DataSource from '../utils/datasource';

async function getLists(): Promise<List[]> {
    return DataSource
        .getRepository(List)
        .createQueryBuilder('list')
        .leftJoinAndSelect('list.tasks','task')
        .orderBy('list.listId','ASC')
        .getMany();
}

async function getList(listId: number): Promise<List> {

    return DataSource
        .getRepository(List)
        .createQueryBuilder('list')
        .select(['list.listId AS "listId"', 'list.name AS "name"'])
        .where("list.listId = :listId", { listId })
        .getRawOne();
}

async function createList(name: string): Promise<List> {
        const result: InsertResult = await DataSource
            .createQueryBuilder()
            .insert()
            .into(List)
            .values([{ name }])
            .execute();

        return result.raw[0];
}

async function deleteList(listId: number): Promise<List> {
    const list = await DataSource.getRepository(List).findOneOrFail({
        where: {
            listId
        },
        relations: ['tasks']
    });
    const deletedList: List = await DataSource.getRepository(List).softRemove(list);

    return deletedList;
}


export default { getLists, getList, createList, deleteList };
