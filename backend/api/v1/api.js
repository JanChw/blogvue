const BlogsController = require('../../controllers/BlogsController');
const UsersController = require('../../controllers/UsersController');
const api = require('express').Router();

api.route('/blogs')
    .get(BlogsController.getAllBlogs)
    .post(BlogsController.addBlog);

api.route('/blogs/:id')
   .get(BlogsController.getBlog)
   .patch(BlogsController.updateBlog)
   .delete(BlogsController.removeBlog);

api.post('/users/register',UsersController.register);
api.patch('/users/:id',UsersController.updateUser);

api.post('/admin/login',UsersController.login);
api.get('/admin/logout',UsersController.logout);

module.exports = api;
   