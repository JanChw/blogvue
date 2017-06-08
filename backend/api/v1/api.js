const BlogsController = require('../../controllers/BlogsController');
const UsersController = require('../../controllers/UsersController');
const actionsAuth = require('../../middlewares/action-auth');
const isOwnerOrAdmin = require('../../middlewares/isOwnerOrAdmin');
const isObjectId = require('../../middlewares/isObjectId');

const api = require('express').Router();

api.param('id',isObjectId);

api.use(['/blogs'],actionsAuth);

api.route('/blogs')
    .get(BlogsController.getAllBlogs)
    .post(BlogsController.addBlog);

api.route('/blogs/:id')
   .get(BlogsController.getBlog)
   .all(isOwnerOrAdmin)
   .patch(BlogsController.updateBlog)
   .delete(BlogsController.removeBlog);

api.post('/users/register',UsersController.register);
api.patch('/users/:id',UsersController.updateUser);
api.get('/users/:id/blogs',UsersController.getAllBlogs)

api.post(['/admin/login','/users/login'],UsersController.login);
api.get(['/admin/logout','/users/logout'],UsersController.logout);

module.exports = api;
   