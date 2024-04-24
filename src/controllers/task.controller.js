import { NotFoundError, BadRequestError } from '../errors/index.js';
import TaskModel from '../models/task.model.js';
import { validationResult } from 'express-validator';
import asyncWrapper from '../middlewares/async.js';

export const test = asyncWrapper((req, res, next) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors.array());
        return next(new BadRequestError(errors.array()[0].msg));
    }
    res.status(200).json({
        message:'Hello World!'});
})

export const addTask = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(new BadRequestError(errors.array()[0].msg));
        }

        const newTask = await TaskModel.create(req.body);
        return res.status(201).json(newTask)
});

export const getTasks = asyncWrapper(async (req, res, next) => {
        const tasks = await TaskModel.find({});
        if (tasks) {
            return res.status(200).json({
                nbHits:tasks.length,
                tasks});
        }

});
export const addCheckListItem = asyncWrapper(async (req, res, next) =>
{
const Taskid=req.query.id;
const item =req.body;
const taskBeforeupdate=await TaskModel.findById(Taskid);
const checkListItem= taskBeforeupdate.checklist
checkListItem.push(item);
const updateTask = await TaskModel.findByIdAndUpdate(Taskid,
{checklist:checkListItem},{new:true});
if(!updateTask)
{
return next(new NotFoundError('Task not found'));
};
return res.status(200).json(updateTask)
})
export const updateCheckListItem=asyncWrapper(async(req,res,next)=>
{
    const TaskId=req.query.id;
    const checklistItem=req.query.item;
    const update=req.body;
    const taskbeforeUpdate=await TaskModel.findById(TaskId);
    const checkListItems=taskbeforeUpdate.checklist;
    checkListItems.forEach(item=>
    {
        if(item._id.toString()=== checklistItem && !update.name)
        {
            item.checked=!item.checked;
        }
        else if(item._id.toString() === checklistItem && update.name)
        {
            item.name=update.name;
        }
    });

    const updatedTask= await TaskModel.findByIdAndUpdate(TaskId,
        {checklist:checkListItems},{new:true})
        if(!updatedTask)
        {
            return next(new NotFoundError('Task not found'));
        };
        return res.status(200).json(updatedTask);
});
export const updateTask = asyncWrapper(async (req, res, next) => {
    const id = req.params.id;
    const updates = req.body;
    if(updates.tags)
    {
        const taskBeforeupdate=await TaskModel.findById(id)
        let tags=[];
        taskBeforeupdate.tags.forEach(tag=>
        {
            tags.push(updates.tags[0]);
            updates.tags=tags;
        })
    }
    if(updates.tags)
    {
        const taskBeforeUpdate= await TaskModel.findById(id);
        let checkListItems=[];
        taskBeforeUpdate.checkListItems.forEach(item=>
        {
            checkListItems.push(item.toString());
        })
        checkListItems.push(updates.checklist[0]);
            updates.checklist=checkListItems;
    }
        const updatedTask = await TaskModel.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedTask) {
            return next(new NotFoundError(`Task not found`));
        } 
        return res.status(200).json(updatedTask);
})

export const findById = asyncWrapper(async (req, res, next) => {
    const id = req.params.id;
        const foundTask = await TaskModel.findById(id);
        if (!foundTask) {
            return next(new NotFoundError(`Task not found`));
        }
        return res.status(200).json(foundTask);
})
export const findByStatus = asyncWrapper(async (req, res, next) => {
    const Taskstatus = req.params.id;
        const foundTask = await TaskModel.findOne(Taskstatus);
        if (!foundTask) {
            return next(new NotFoundError(`Task not found`));
        }
        return res.status(200).json(foundTask);
    
});

export const findByParentId = asyncWrapper(async (req, res, next) => {
    const Parentid = req.query.parentTask;
        const foundTask = await TaskModel.find({parentTask:Parentid});
        if (!foundTask) {
            return next(new NotFoundError(`Task not found`));
        }
        return res.status(200).json({
            nbHits:foundTask.length,
            foundTask});
})
export const FindByTags =asyncWrapper(async (req,res,next)=>
{
    const TagId = req.query.tags
        const allTasks= await TaskModel.find({})
        const foundTask=[];
        allTasks.forEach(task=>{
            if(task.tags.includes(TagId))
            foundTask.push(task);

        });
        return res.status(200).json({
            nbHits:foundTask.length,
            tasks:foundTask
        })

});

export const deleteTask = asyncWrapper(async (req, res, next) => {
        const deletedTask = await TaskModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ 
        task:deletedTask,
            message: 'Task deleted'});
});