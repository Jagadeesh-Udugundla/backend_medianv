const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
