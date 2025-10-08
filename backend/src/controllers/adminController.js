const mongoose = require("mongoose");
const Post = require('../models/Post');

const createPost = async (req, res) => {
  try {
    console.log('Creating post with data:', req.body, 'by professor:', req.professor);
    const { title, description, image, subject } = req.body;
    const { professor } = req;

    if (!title || !description || !subject) {
      return res.status(400).json({ error: 'Title, description and subject are required.' });
    }

    const newPost = new Post({
      title,
      description,
      image,
      subject,
      teacherName: professor.name || professor.email,
      teacherId: professor.id,
      createdAt: new Date(),
    });

    await newPost.save();
    return res.status(201).json({ message: 'Post created successfully.', post: newPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error creating post.' });
  }
};

const getPosts = async (req, res) => {
  try {
    const { professor } = req;

    console.log("Professor JWT payload:", professor);

    let posts;
    if (professor.role === 'admin') {
      posts = await Post.find();
    } else if (professor.role === 'professor') {
      // Corrige o ObjectId para evitar TypeError
      posts = await Post.find({ teacherId: new mongoose.Types.ObjectId(professor.id) });
    } else {
      posts = [];
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching posts.' });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { professor } = req;
    const { title, description, image, subject } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    if (professor.role !== 'admin' && String(post.teacherId) !== String(professor.id)) {
      return res.status(403).json({ error: 'Unauthorized to update this post.' });
    }

    if (title) post.title = title;
    if (description) post.description = description;
    if (image !== undefined) post.image = image;
    if (subject) post.subject = subject;

    await post.save();
    return res.status(200).json({ message: 'Post updated successfully.', post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error updating post.' });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { professor } = req;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    if (professor.role !== 'admin' && String(post.teacherId) !== String(professor.id)) {
      return res.status(403).json({ error: 'Unauthorized to delete this post.' });
    }

    await Post.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error deleting post.' });
  }
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
};
