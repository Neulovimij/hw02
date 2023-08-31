import {body} from "express-validator";
import {db} from "../db";
import {inputValidatorMiddleware} from "./input-validation-middleware";


export const validationCreateUpdatePost = [
    body('title').isString().trim().isLength({min: 1, max: 30}).withMessage('incorrect title'),
    body('shortDescription').isString().trim().isLength({min: 1, max: 200}).withMessage('incorrect shortDescription'),
    body('content').isString().trim().isLength({min: 1, max: 500}).withMessage('incorrect content'),
    body('blogId').isString().trim().notEmpty().withMessage('incorrect blogId').custom((id,req ) => {
        const postUpdate = db.blogs.find(b => b.id === id)
        if (!postUpdate) {
            throw new Error("blog is not found")
        } else {
            req.req.body.blogName = postUpdate.name
            return true
        }
    }) ,
inputValidatorMiddleware
]