import express from 'express';
import { Task } from '../entities';
import { TaskService } from '../services';
import logger from '../utils/logger';

const router: express.Router = express.Router();

router.post('/', async (req: express.Request, res: express.Response, next) => {
    try {

        const { listId, name, description, deadline } = req.body;
        const task: Task = await TaskService.createTask(listId, { name, description, deadline });

        return (task) ? res.json({ success: true }) : res.json({ success: false })
    } catch (err) {
        next(err.message);
    }
});

router.put('/complete', async (req: express.Request, res: express.Response, next) => {
    try {

        const { taskId } = req.body;
        const result: boolean = await TaskService.completeTask(taskId);
        logger.info("task is completed!");
        return res.json({ success: result });
    } catch (err) {
        next(err.message);
    }
});


router.put('/', async (req: express.Request, res: express.Response, next) => {
    try {

        const { taskId, name, description, deadline } = req.body;
        const result: boolean = await TaskService.updateTasks(taskId, { name, description, deadline });

        return res.json({ success: result });
    } catch (err) {
        next(err.message);
    }
});

router.delete('/:id', async (req: express.Request, res: express.Response, next) => {
    try {
        const { id } = req.params;
        const result: boolean = await TaskService.deleteTask(id);

        return res.json({ success: result });
    } catch (err) {
        next(err.message);
    }
});

router.delete('/', async (req: express.Request, res: express.Response, next) => {
    try {
        const { taskIds } = req.body;
        const result: boolean = await TaskService.deleteTasks(taskIds);

        return res.json({ success: result });
    } catch (err) {
        next(err.message);
    }
});

export default router;
