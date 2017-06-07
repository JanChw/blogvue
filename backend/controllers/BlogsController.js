const Blog = require('../models/Blog');
const User = require('../models/User');


// let idIsValid = (req) => mongoose.Types.ObjectId.isValid(req.params.id);
// let idIsValid = () => mongoose.Types.ObjectId.isValid(req.params.id);
module.exports = {
  async getAllBlogs(req, res, next) {
    // try {
    //   let blogs = await Blog.find();
    //   res.json(blogs);
    // } catch (err) {
    //   next(err);
    // }
    res.wrap(async () => {
      let blogs = await Blog.find();
      res.json(blogs);
    });
  },
  async addBlog(req, res, next) {
    // try {
    //   console.log(req.body);
    //   let blog = await Blog.create(req.body);
    //   res.json(blog);
    // } catch (err) {
    //   next(err)
    // }
    res.wrap(async () => {
      Object.assign(req.body,{author:req.session.userId});
      let blog = await Blog.create(req.body);
      let user = await User.findById(req.session.userId).populate('posts');
        user.posts.push(blog._id);
        await  user.save();
      res.json(blog);
    });
  },
  async getBlog(req, res, next) {
    // idIsValid.bind(req)()
    console.log(res.idIsValid(req));
    if (res.idIsValid(req)) {
      // try {
      //   let blog = await Blog.findById(req.params.id);
      //   return res.json(blog);
      // } catch (err) {
      //   next(err);
      // }
     return res.wrap(async () => {
        let blog = await Blog.findById(req.params.id).populate('author');
        res.json(blog);
      });
    }
    next(new Error('此博客id不存在'));
    //res.json({err:'此博客id不存在！'});

  },
  async updateBlog(req, res, next) {
    if (res.idIsValid(req)) {
      // try {
      //   //findByIdAndUpdate 返回的事跟新前的值
      //   let result = await Blog.findByIdAndUpdate(req.params.id, req.body);
      //   return res.json(result);
      // } catch (err) {
      //   next(err);
      // }
     return res.wrap(async () => {
        let blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
        res.json(blog);
      });
    }
    next(new Error('此博客id不存在'));
  },
  async removeBlog(req, res,next) {
    if (res.idIsValid(req)) {
      // try {
      //   //findByIdAndRemove 返回的是删除的值
      //   let result = await Blog.findByIdAndRemove(req.params.id);
      //   return res.json(result);
      // } catch (err) {
      //   next(err);
      // }
      return res.wrap(async () => {
        let blog = await Blog.findByIdAndRemove(req.params.id);
        let user = await User.findById(req.session.userId).populate('posts');
        let posts = user.posts;
        posts.splice(posts.indexOf(blog._id),1);
        await user.save();
        res.json(blog);
      });
    }
    next(new Error('此博客id不存在'));

  }
}
// function idIsValid(){
//     return mongoose.Types.ObjectId.isValid(req.params.id);
//   }