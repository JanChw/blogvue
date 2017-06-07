const User = require('../models/User');
module.exports = {
  async register(req, res, next) {
    // try {
    //   let user = await User.create(req.body);
    //   res.json(user);
    // } catch (err) {
    //   next(err);
    // }
    res.wrap(async () => {
      let user = await User.create(req.body);
      res.json(user);
    });
  },
  async updateUser(req, res, next) {
    if (res.idIsValid(req)) {
      // try {
      //   let user = await User.findByIdAndUpdate(req.params.id, req.body);
      //   res.json(user);
      // } catch (err) {
      //   next(err)
      // }
      return res.wrap(async () => {
        let user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.json(user);
      });
    }
    next(new Error('此id不存在！'));
  },
  async login(req, res, next) {
    // try {
    //   let user = await User.findOne(req.body);
    //   if (user) {
    //     req.session.userId = user._id;
    //     console.log(req);
    //     return res.json({ user: user })
    //   }
    //   next(new Error('用户名或密码不正确'));
    // } catch (err) {
    //   next(err);
    // }
    res.wrap(async () => {
      let user = await User.findOne(req.body);
      if (user) {
        req.session.userId = user._id;
        req.session.currentUser = user;
        console.log(req);
       return  res.json({ user: user })
      }
      next(new Error('用户名或密码不正确'));
    });
  },
  logout(req, res) {
    delete req.session.userId;
    delete req.session.currentUser;
    console.log(req.session);
    res.json({ user: null });
  },
  async getAllBlogs(req, res, next) {
    if (res.idIsValid(req)) {
      //   try {
      //     let user = await User.findById(req.params.id).populate('posts');
      //     return res.json(user.posts);
      //   } catch (err) {
      //     next(err);
      //   }
      // }
     return  res.wrap(async () => {
        let user = await User.findById(req.params.id).populate('posts');
        res.json(user.posts);
      });
    }
    next(new Error('用户id不存在'));
  }

}