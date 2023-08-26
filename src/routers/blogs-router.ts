import {Request, Response,Router} from "express";
import {blogsRepository} from "../repositories/blogs-repositoriy";
import {autorizationValidationMiddleware} from "../middlewares/autorization";
import {validationCreateUpdateBlog} from "../middlewares/blogs-validation";

export const blogsRouter = Router({})

blogsRouter.get(`/`, (req: Request, res: Response)=>{
const blogs = blogsRepository.findBlogs()
    res.send(blogs)
})
blogsRouter.post(`/`,
    autorizationValidationMiddleware,
    validationCreateUpdateBlog,
    (req: Request, res: Response ) => {
  const {name, description, websiteUrl} = req.body
  const newBlog = blogsRepository.createBlog(
      name,
      description,
      websiteUrl
  )
    res.status(201).send(newBlog)
})

blogsRouter.get(`/:blogsId`, (req: Request, res: Response)=>{
    const blog = blogsRepository.findBlogById(req.params.blogsId)
    if(blog) {
        res.send(blog)
    } else {
        res.sendStatus(404)
    }
})

blogsRouter.put(`/:blogsId`,
    autorizationValidationMiddleware,
    validationCreateUpdateBlog,
    (req: Request, res: Response ) => {
        const {name, description, websiteUrl} = req.body
        const isUpdated = blogsRepository.updateBlog(
            req.params.blogsId,
            name,
            description,
            websiteUrl)

        if (isUpdated) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })

blogsRouter.delete(`/:blogsId`,
    autorizationValidationMiddleware,
    (req: Request, res: Response ) => {
        const isDeleted = blogsRepository.deleteBlog(req.params.blogsId)
                if (isDeleted) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })