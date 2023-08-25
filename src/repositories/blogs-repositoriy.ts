import {db} from "../db";


export const blogsRepository = {
    findBlogs() {
        return db.blogs
    },
    createBlog(name: string, description: string, websiteUrl: string) {
        const newBlog = {
            id: (+(new Date())).toString(),
            name,
            description,
            websiteUrl
        }

        db.blogs.push(newBlog)
        return newBlog
    },
    findBlogById(id: string) {
        let blog = db.blogs.find(b => b.id === id)
        return blog
    },
    updateBlog(id: string, name: string, description: string, websiteUrl: string) {
        const blog = db.blogs.find(b => b.id === id)
        if (blog) {
            blog.name = name
            blog.description = description
            blog.websiteUrl = websiteUrl
            return true
        } else {
            return false
        }
    },
    deleteBlog(id: string) {
        const newBlogs = db.blogs.filter(b=> b.id !==id)
if (newBlogs.length < db.blogs.length) {
    db.blogs = newBlogs
    return true
} else {
    return false
}
    }
}