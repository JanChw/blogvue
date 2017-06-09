const User = require('../models/User');

module.exports = async (req,res,next) => {
  let user = await User.findOne(req.body);
  if(!user.isActived){
    return res.json({msg:'您的账号为激活，请先激活再登陆！'});
  }
  next();

}