const express = require('express');
const { authenticateUser } = require('../middlewares/authUser');
const controller = require('../controllers/blogControllers');

const blogRouter = express.Router();

blogRouter.post('/create', authenticateUser, controller.createBlog);
blogRouter.get('/', controller.getBlog);
blogRouter.get('/:id', controller.getBlogById);
blogRouter.put('/update/:id', controller.updateBlog);
blogRouter.delete('/:id', controller.deleteBlog);

module.exports = blogRouter;