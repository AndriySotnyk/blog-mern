const Post = require('../models/Post');

const findAllPosts = async () => {
    return await Post.find().sort({ date: -1 });
};

const createPost = async (postData) => {
    const newPost = new Post(postData);
    return await newPost.save();
};

const findPostById = async (id) => {
    return await Post.findById(id);
};

const updatePostById = async (id, updateData) => {
    return await Post.findByIdAndUpdate(id, updateData, { new: true });
};

const deletePostById = async (id) => {
    return await Post.findByIdAndDelete(id);
};

module.exports = {
    findAllPosts,
    createPost,
    findPostById,
    updatePostById,
    deletePostById
};
