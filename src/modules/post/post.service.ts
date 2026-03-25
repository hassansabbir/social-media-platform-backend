import { Post } from './post.model';

const createPost = async (userId: string, content: string) => {
  const post = await Post.create({ author: userId, content });
  return post.populate('author', 'name username avatarUrl');
};

const getFeedPosts = async () => {
  return await Post.find()
    .sort({ createdAt: -1 })
    .populate('author', 'name username avatarUrl');
};

export const PostService = {
  createPost,
  getFeedPosts,
};
