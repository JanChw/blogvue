const User = require('../models/User');
const sendMail = require('../servers/mailer');

module.exports = async (req,res,next) => {
  let user = await User.findOne({activeToken:req.params.activeToken});
  if(!user){
    return res.json({msg:'链接非法！'});
  }
  if(Date.parse(user.activeExpires)-Date.now()<0){
      sendMail(user);
      user.activeExpires = Date.now()+12*60*60*1000;
      await user.save();
      return res.json({msg:'请您再到注册邮箱激活账号！'})
      
  }
  user.isActived = true;
  await user.save();
  next();
}