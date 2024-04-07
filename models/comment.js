// Dependencies
const mongoose = require('mongoose');
const shortid = require('shortid');

// Schema for the Comments
const commentSchema = new mongoose.Schema({
    id: { type: String, default: shortid.generate },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'blog', required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date }
});

// Middleware to update the date field "updatedAt" 
commentSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// Module export
module.exports = mongoose.model("comment", commentSchema);
