import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const blogSchema = new Schema({
    userId: { type: Number, required: true },
    id: { type: Number, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true }
});

const Blog = model('Blog', blogSchema);

export default Blog;
