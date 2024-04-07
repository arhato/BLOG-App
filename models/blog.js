// Dependencies
const mongoose = require('mongoose');
const shortid = require('shortid');

// Schema for the Blogs
const blogSchema = new schema({

    id: { type: String, default: shortid.generate },
    title: { type: String, required: false },
    description: { type: String, required: true },
    tag: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    state: { type: String, default: 'draft' },
    read_count: { type: Number, required: true, default: 0 },
    body: { type: String, required: false }

})

// Middleware to update the date field "updatedAt"
blogSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// Module export
module.exports = mongoose.model("blog", blogSchema);
