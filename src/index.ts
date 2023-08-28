import express from "express";
import bodyParser from "body-parser"
import {blogsRouter} from "./routers/blogs-router";
import {postsRouter} from "./routers/posts-router";
import {testingRouter} from "./routers/testing-router";
import {db} from "./db";

const app = express()
const port = 3000

const parserMiddleware = bodyParser()
app.use(parserMiddleware)
app.use(express.json())


app.use("/testing/all-data",testingRouter)
app.use("/blogs", blogsRouter)
app.use("/posts", postsRouter)

app.delete("/testing/all-data", (req: express.Request, res: express.Response) => {
    db.blogs.length = 0;
    db.posts.length = 0;
    res.sendStatus(204)
});


app.listen(port, () => {
    console.log(`Example app listenning on port ${port}`)
})