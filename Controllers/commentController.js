import express from 'express';
import Comment from '../Models/Comment.js';
const router = express.Router();

router.post('/blogs/:blogId/comments', async (req, res) => {
    try {
        const { blogId } = req.params;
        const { name, email, body } = req.body;

        if (!name || !email || !body) {
            return res.status(400).json({ success: false, message: 'Incomplete comment data' });
        }

        const newComment = new Comment({
            blogId,
            name,
            email,
            body
        });

        const savedComment = await newComment.save();

        res.status(201).json({ success: true, message: 'Comment added successfully', data: savedComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.get('/blogs/:blogId/comments', async (req, res) => {
    try {
        const { blogId } = req.params;

        const comments = await Comment.find({ blogId });

        res.json({ success: true, message: 'Comments retrieved successfully', data: comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.delete('/comments/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: 'Comment not found.' });
        }

        await Comment.findByIdAndDelete(commentId);

        res.json({ success: true, message: 'Comment deleted successfully.' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

export default router;

