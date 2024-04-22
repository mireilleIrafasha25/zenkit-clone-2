import { NotFoundError, BadRequestError } from '../errors/index.js';
import TagModel from '../models/tag.model.js';
import { validationResult } from 'express-validator';

export const addTag = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            next(new BadRequestError(errors.array()[0].msg));
        }
        const newTag = await TagModel.create(req.body);
        return res.status(201).json(newTag);
    }
     catch (error) {
        next(error);
    }
};

export const getTags = async (req, res, next) => {
    try {
        const tags = await TagModel.find({});
        if (tags) {
            return res.status(200).json({
                size:tags.length,
                tags});
        }
    } catch (error) {
        next(error);
    }
}

export const updateTag = async (req, res, next) => {
    const id = req.params.id;
    const updates = req.body;

    try {
        const updatedTags = await TagModel.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedTags) {
            return next(new NotFoundError(`Task not found`));
        } 
        return res.status(200).json(updatedTags);
    } catch (error) {
        next(error);
    }
}

export const findById = async (req, res, next) => {
    const id = req.params.id;
    
    try {
        const foundTag = await TagModel.findById(id);
        if (!foundTag) {
            return next(new NotFoundError(`Task not found`));
        }
        return res.status(200).json(foundTag);
    } catch (error) {
        next(error);
    }
}
export const deleteTag = async (req, res, next) => {
    try {
        const deletedTag = await TagModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ 
        task:deletedTag,
            message: 'Task deleted'});
    } catch (error) {
        next(error);
    }
}