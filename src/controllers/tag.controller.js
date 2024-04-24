import { NotFoundError, BadRequestError } from '../errors/index.js';
import asyncWrapper from '../middlewares/async.js';
import TagModel from '../models/tag.model.js';
import { validationResult } from 'express-validator';

export const addTag = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
if (!errors.isEmpty()) {
            next(new BadRequestError(errors.array()[0].msg));
        }
        const newTag = await TagModel.create(req.body);
        return res.status(201).json(newTag);
    
});

export const getTags =asyncWrapper( async (req, res, next) => {
        const tags = await TagModel.find({});
        if (tags) {
            return res.status(200).json({
                size:tags.length,
                tags});
        }
    
});

export const updateTag = asyncWrapper(async (req, res, next) => {
    const id = req.params.id;
    const updates = req.body;

    
        const updatedTags = await TagModel.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedTags) {
            return next(new NotFoundError(`Task not found`));
        } 
        return res.status(200).json(updatedTags);
})

export const findById = asyncWrapper(async (req, res, next) => {
    const id = req.params.id;
        const foundTag = await TagModel.findById(id);
        if (!foundTag) {
            return next(new NotFoundError(`Task not found`));
        }
        return res.status(200).json(foundTag);
})
export const deleteTag = asyncWrapper(async (req, res, next) => {
        const deletedTag = await TagModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ 
        task:deletedTag,
            message: 'Task deleted'});
});