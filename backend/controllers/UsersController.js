const User = require('../models/User');
const sendMail = require('../servers/mailer');
module.exports = {
  async register(req, res, next) {
    // try {
    //   let user = await User.create(req.body);
    //   res.json(user);
    // } catch (err) {
    //   next(err);
    // }
    res.wrap(async () => {
      let activeToken = await res.hash();
      Object.assign(req.body, { activeToken })
      let user = await User.create(req.body);
      sendMail(user);
      res.json(user);
    });
  },
  async updateUser(req, res, next) {
    // try {
    //   let user = await User.findByIdAndUpdate(req.params.id, req.body);
    //   res.json(user);
    // } catch (err) {
    //   next(err)
    // }
    res.wrap(async () => {
      let user = await User.findByIdAndUpdate(req.params.id, req.body);
      res.json(user);
    });

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
        return res.json({ user: user })
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
    //   try {
    //     let user = await User.findById(req.params.id).populate('posts');
    //     return res.json(user.posts);
    //   } catch (err) {
    //     next(err);
    //   }
    // }
    res.wrap(async () => {
      let user = await User.findById(req.params.id).populate('posts');
      res.json(user.posts);
    });

  },
  async activeUser(req, res, next) {
    console.log(req.params.activeToken);
    let user = await User.findOne({ activeToken: encodeURIComponent(req.params.activeToken) });
    console.log(user);

    if (!user) {
      return res.json({ msg: '链接非法！' });
    }

    if (Date.parse(user.activeExpires) - Date.now() < 0) {
      sendMail(user);
      user.activeExpires = Date.now() + 12 * 60 * 60 * 1000;
      await user.save();
      return res.json({ msg: '请您再到注册邮箱激活账号！' })
    }

    user.isActived = true;
    await user.save();
    res.json({msg:'账号已激活'})
    next();
  }

}