import express from "express";
import ListController from './list';
import TaskController from './task';
const router: express.Router = express.Router();

router.use("/lists", ListController);
router.use("/tasks", TaskController);

export default router;

