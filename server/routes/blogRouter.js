const express = require('express');
const auth = require('../middlewares/authUser');
const controller = require('../controllers/blogControllers');

const blogRouter = express.Router();

blogRouter.use(auth.authenticateUser);

blogRouter.post('/', controller.createBlog);
blogRouter.get('/', controller.getBlog);
blogRouter.get('/:id', controller.getBlogById);
blogRouter.put('/update/:id', controller.updateBlog);
blogRouter.delete('/:id', controller.deleteBlog);

module.exports = blogRouter;