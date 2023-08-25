import {Request, Response,Router} from "express";
import {blogsRepository} from "../repositories/blogs-repositoriy";

export const blogsRouter = Router({})

blogsRouter.get(`/`, (req: Request, res: Response)=>{
const blogs = blogsRepository.findBlogs()
    res.send(blogs)
})
blogsRouter.post(`/`, (req: Request, res: Response ) => {
  const {name, description, websiteUrl} = req.body
  const newBlog = blogsRepository.createBlog(
      name,
      description,
      websiteUrl
  )
    res.status(201).send(newBlog)
})