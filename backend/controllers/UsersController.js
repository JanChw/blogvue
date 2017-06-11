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
      let token = await res.hash();
      Object.assign(req.body, { token })
      let user = await User.create(req.body);
      sendMail(user,'active');
      res.json(user);
    });
  },
  async forgetPassword(req, res, next) {
    // try {
    //   let user = await User.findByIdAndUpdate(req.params.id, req.body);
    //   res.json(user);
    // } catch (err) {
    //   next(err)
    // }
    res.wrap(async () => {
      let token = await res.hash();
      let user = await User.findOne({email:req.body.email});
      if(!user){
        return res.json({msg:'该邮箱未注册！'});
      }
      user.token = token;
      sendMail(user,'resetPwd');
      let result = await user.save();
      
      res.json(result);
    });

  },
  
  async resetPassword(req,res,next){
    res.wrap(async () => {
      let token = encodeURIComponent(req.params.token);
      let user = await User.findOne({token});
      
      user.password = req.body.password;
      await user.save();
      res.json({msg:'密码修改成功！'});
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
      
        req.session.userId = user._id;
        req.session.currentUser = user;
        return res.status(200).json({ msg:'成功登陆！'});
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
    let token = encodeURIComponent(req.params.token);
    let user = await User.findOne({ token });

    user.isActived = true;
    await user.save();
    res.json({msg:'账号已激活'})
  }

}