import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema({
    blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    body: { type: String, required: true }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
