import express from 'express';
import List from '../entities/list';
import { ListService } from '../services';
const router: express.Router = express.Router();

router.get('/', async (req: express.Request, res: express.Response, next) => {
    try {
        const lists: List[] = await ListService.getLists();
        return res.json({ lists, success: true });
    } catch (err) {
        next(err.message);
    }
});

router.get('/:id', async (req: express.Request, res: express.Response, next) => {
    try {
        const {id} = req.params;
        const list: List = await ListService.getList(id);
        return res.json({ list, success: true });
    } catch (err) {
        next(err.message);
    }
});

router.post('/', async (req: express.Request, res: express.Response, next) => {
    try {
        const { name } = req.body;
        const list: List = await ListService.createList(name);

        return (list) ? res.status(201).send({ listId: list.listId, success: true }) : res.json({ success: false })
    } catch (err) {
        next(err.message);
    }
});

router.delete('/:id', async (req: express.Request, res: express.Response, next) => {
    try {
        const { id } = req.params;
        const deletedList: List = await ListService.deleteList(id);

        return (deletedList) ? res.json({ listId: deletedList.listId, success: true }) : res.json({ success: false })
    } catch (err) {
        next(err.message);
    }
});
export default router;