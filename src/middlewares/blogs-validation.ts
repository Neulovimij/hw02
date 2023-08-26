import {body} from "express-validator";


export const validationCreateUpdateBlog = [
    body('name').isString().trim().isLength({min: 1, max: 15}).withMessage('incorrect name'),
    body('description').isString().trim().isLength({min: 1, max: 300}).withMessage('incorrect description'),
    body('websiteUrl').isURL().isLength({min: 1, max: 50}).withMessage('incorrect websiteUrl'),

]