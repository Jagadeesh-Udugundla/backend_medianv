const express = require("express")
const mongoose =require("mongoose")
const cors= require('cors')

const app=express()
mongoose.connect("mongodb+srv://jagadeesh:medianv@cluster0.aqxnrkt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("DB Connected")
})

app.use(express.json())

app.use(cors({origin:"*"}))

const User = require('./models/user.js');
const Blog = require('./models/blog.js');
const Comment = require('./models/comment.js');

// CRUD operations for User
app.post('/users', async (req, res) => {
  try {
    const { name } = req.body;
    let user = new User({ name });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// CRUD operations for Blog
app.post('/blogs', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// CRUD operations for Comment
app.post('/comments', async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find().populate('user').populate('blog');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(5000,()=>{
    console.log("Server running 5000")
})