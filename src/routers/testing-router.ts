import {Request, Response,Router} from "express";
import {db} from "../db";


export const testingRouter = Router({})

testingRouter.delete("/testing/all-data", (req: Request, res: Response) => {
    db.blogs.length = 0;
    db.posts.length = 0;
})