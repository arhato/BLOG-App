const express=require('express');
const controller = require('../controllers/commentControllers');

const commentRouter=express.Router();

commentRouter.post('/', controller.createComment);
commentRouter.get('/blog/:blogId', controller.getCommentsByBlog);
commentRouter.delete('/:commentId', controller.deleteComment);

modules.exports= commentRouter;