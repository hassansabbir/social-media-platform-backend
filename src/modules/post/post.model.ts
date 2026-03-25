import mongoose, { Schema } from 'mongoose';
import { IPost } from './post.interface';

const postSchema = new Schema<IPost>({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  commentsCount: { type: Number, default: 0 },
}, { timestamps: true });

export const Post = mongoose.model<IPost>('Post', postSchema);
