import express from 'express';
const tagRouter = express.Router();
import {addTag,deleteTag,findById,getTags,updateTag} from "../controllers/tag.controller.js"
import { addTagValidation } from '../utils/validation.js';

tagRouter.post('/add', addTagValidation, addTag);
tagRouter.get('/list', getTags);
tagRouter.put('/update/:id', updateTag);
tagRouter.get('/findById/:id', findById);
tagRouter.delete('/delete/:id', deleteTag);

export default tagRouter;