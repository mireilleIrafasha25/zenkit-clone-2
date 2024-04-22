import { NotFoundError, BadRequestError } from '../errors/index.js';
import TaskModel from '../models/task.model.js';
import { validationResult } from 'express-validator';

export const test = (req, res, next) => {
    res.send('Hello World!');
}

export const addTask = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            next(new BadRequestError(errors.array()[0].msg));
        }

        const newTask = await TaskModel.create(req.body);
        return res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
};

export const getTasks = async (req, res, next) => {
    try {
        const tasks = await TaskModel.find({});
        if (tasks) {
            return res.status(200).json({
                size:tasks.length,
                tasks});
        }
    } catch (error) {
        next(error);
    }
}

export const updateTask = async (req, res, next) => {
    const id = req.params.id;
    const updates = req.body;

    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedTask) {
            return next(new NotFoundError(`Task not found`));
        } 
        return res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
}

export const findById = async (req, res, next) => {
    const id = req.params.id;
    
    try {
        const foundTask = await TaskModel.findById(id);
        if (!foundTask) {
            return next(new NotFoundError(`Task not found`));
        }
        return res.status(200).json(foundTask);
    } catch (error) {
        next(error);
    }
}
export const findByStatus = async (req, res, next) => {
    const Taskstatus = req.params.id;
    
    try {
        const foundTask = await TaskModel.findOne(Taskstatus);
        if (!foundTask) {
            return next(new NotFoundError(`Task not found`));
        }
        return res.status(200).json(foundTask);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const findByParentId = async (req, res, next) => {
    const Parentid = req.query.parentTask;
    
    try {
        const foundTask = await TaskModel.find({parentTask:Parentid});
        if (!foundTask) {
            return next(new NotFoundError(`Task not found`));
        }
        return res.status(200).json({
            size:foundTask.length,
            foundTask});
    } catch (error) {
        next(error);
    }
}
export const FindByTags =async (req,res,next)=>
{
    const TagId = req.query.tags
    try{
        const allTasks= await TaskModel.find({})
        const foundTask=[];
        allTasks.forEach(task=>{
            if(task.tags.includes(TagId))
            foundTask.push(task);

        });
        return res.status(200).json({
            size:foundTask.length,
            tasks:foundTask
        })
    }
    catch(error)
    {
        next(error);
    }

}

export const deleteTask = async (req, res, next) => {
    try {
        const deletedTask = await TaskModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ 
        task:deletedTask,
            message: 'Task deleted'});
    } catch (error) {
        next(error);
    }
}