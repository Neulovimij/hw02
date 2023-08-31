import {Request, Response, Router} from "express";
import {autorizationValidationMiddleware} from "../middlewares/autorization";
import {postsRepository} from "../repositories/posts-repositoriy";
import {validationCreateUpdatePost} from "../middlewares/posts-validation";

export const postsRouter = Router({})

postsRouter.get(`/`, (req: Request, res: Response) => {
    const posts = postsRepository.findposts()
    res.send(posts)
})
postsRouter.post(`/`,
    autorizationValidationMiddleware,
    validationCreateUpdatePost,
    (req: Request, res: Response) => {
        const {title, shortDescription, content, blogId, blogName} = req.body
        const newPost = postsRepository.createPosts(
            title,
            shortDescription,
            content,
            blogId,
            blogName
        )
        return res.status(201).send(newPost)
    })

postsRouter.get(`/:postsId`, (req: Request, res: Response) => {
    const post = postsRepository.findPostById(req.params.postsId)
    if (post) {
        res.send(post)
    } else {
        res.sendStatus(404)
    }
})

postsRouter.put(`/:postsId`,
    autorizationValidationMiddleware,
    validationCreateUpdatePost,
    (req: Request, res: Response) => {
        const {title, shortDescription, content, blogId} = req.body
        const isUpdated = postsRepository.updatePost(
            req.params.postId,
            title,
            shortDescription,
            content,
            blogId,
            )

        if (isUpdated) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })

postsRouter.delete(`/:postsId`,
    autorizationValidationMiddleware,
    (req: Request, res: Response) => {
        const isDeleted = postsRepository.deletePost(req.params.postsId)
        if (isDeleted) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })