import express from "express";
import bodyParser from "body-parser"
import {blogsRouter} from "./routers/blogs-router";
import {postsRouter} from "./routers/posts-router";

const app = express()
const port = 3000

const parserMiddleware = bodyParser()
app.use(parserMiddleware)
app.use(express.json())

app.use("/blogs", blogsRouter)
app.use("/posts", postsRouter)

app.listen(port, () => {
    console.log(`Example app listenning on port ${port}`)
})