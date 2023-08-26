import {db} from "../db";


export const postsRepository = {
    findposts() {
        return db.posts
    },
    createPosts(title: string, shortDescription: string, content: string, blogId: string, blogName: string) {

        const newPost = {
            id: (+(new Date())).toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName
        }
        db.posts.push(newPost)
        return newPost
    },
    findPostById(id: string) {
        let post = db.posts.find(p => p.id === id)
        return post
    },
    updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string) {
        const post = db.posts.find(p => p.id === id)
        if (post) {
            post.title = title,
                post.shortDescription = shortDescription,
                post.content = content,
                post.blogId = blogId
            return true
        } else {
            return false
        }
    },
    deleteBlog(id: string) {
        const newBlogs = db.blogs.filter(b => b.id !== id)
        if (newBlogs.length < db.blogs.length) {
            db.blogs = newBlogs
            return true
        } else {
            return false
        }
    }
}