import express from 'express';
import Blog from '../Models/Blog.js';
const router = express.Router();

router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json({ success: true, message: 'Blogs retrieved successfully.', data: blogs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.get('/blogs/:blogId', async (req, res) => {
    try {
        const blogId = req.params.blogId;

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found.' });
        }

        res.json({ success: true, message: 'Blog retrieved successfully.', data: blog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.post('/blogs', async (req, res) => {
    try {
        const { userId, title, body } = req.body;
        
        const newBlog = new Blog({
            userId,
            title,
            body
        });
        
        const savedBlog = await newBlog.save();

        res.status(201).json({ success: true, message: 'Blog created successfully.', data: savedBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.put('/blogs/:blogId', async (req, res) => {
    try {
        const { userId, title, body } = req.body;
        const blogId = req.params.blogId;

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, { userId, title, body }, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({ success: false, message: 'Blog not found.' });
        }

        res.json({ success: true, message: 'Blog updated successfully.', data: updatedBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.delete('/blogs/:id', async (req, res) => {
    try {
        const blogId = req.params.id;

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found.' });
        }

        await Blog.findByIdAndDelete(blogId);
        
        res.json({ success: true, message: 'Blog deleted successfully.' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

export default router;

