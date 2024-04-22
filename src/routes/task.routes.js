import express from 'express';
const taskRouter = express.Router();
import { test, addTask, deleteTask, getTasks, findById, updateTask,findByStatus,findByParentId ,FindByTags} from '../controllers/task.controller.js';
import { addTaskValidation } from '../utils/validation.js';
import { setTime } from '../middlewares/time.js';

taskRouter.get('/test', test);
taskRouter.post('/add', setTime, addTaskValidation, addTask);
taskRouter.get('/list', getTasks);
taskRouter.put('/update/:id',setTime, updateTask);
taskRouter.get('/findById/:id', findById);
taskRouter.get('/findByStatus/:status', findByStatus);
taskRouter.get("/findbyParent", findByParentId);
taskRouter.get("/findByTags", FindByTags);
taskRouter.delete('/delete/:id', deleteTask);

export default taskRouter;