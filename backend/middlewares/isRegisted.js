const User = require('../models/User');
module.exports = async (req,res,next) => {
  let user = await User.findOne(req.body);
  if(!user){
    return res.json({msg:'未注册或密码错误'});
  }
  next();
}