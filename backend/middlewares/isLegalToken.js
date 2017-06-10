const User = require('../models/User');
module.exports = async (req,res,next,token) => {
  
    let user = await User.findOne({ token:encodeURIComponent(token) });

    if (!user) {
      return res.status(403).json({ msg: '链接非法！' });
    }

    if (Date.parse(user.activeExpires) - Date.now() < 0) {
      if(/active/.test(req.path)){
        sendMail(user,'active');
      }
      sendMail(user,'resetPwd');
      user.activeExpires = Date.now() + 12 * 60 * 60 * 1000;
      await user.save();
      return res.json({ msg: '请您再到注册邮箱激活账号！' })
    }
    next();
}