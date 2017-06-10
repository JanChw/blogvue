const BlogsController = require('../../controllers/BlogsController');
const UsersController = require('../../controllers/UsersController');
const actionsAuth = require('../../middlewares/action-auth');
const isOwnerOrAdmin = require('../../middlewares/isOwnerOrAdmin');
const isObjectId = require('../../middlewares/isObjectId');
const isActived = require('../../middlewares/isActived');
const isRegisted = require('../../middlewares/isRegisted');
const isLegalToken = require('../../middlewares/isLegalToken');

const api = require('express').Router();

api.param('id',isObjectId);
api.param('token',isLegalToken);

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
api.get('/users/:id/blogs',UsersController.getAllBlogs)

api.post(['/admin/login','/users/login'],isRegisted,isActived,UsersController.login);
api.get(['/admin/logout','/users/logout'],UsersController.logout);

api.get('/account/active/:token',UsersController.activeUser);
api.patch('/account/forgetPwd',UsersController.forgetPassword);
api.patch('/account/resetPwd/:token', UsersController.resetPassword);


module.exports = api;
   