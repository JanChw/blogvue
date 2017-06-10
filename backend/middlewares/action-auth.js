module.exports = (req,res,next) => {
  let actions = ['post','patch','put','delete'];
  let action = req.method.toLowerCase();

  if(actions.includes(action) && !req.session.userId){
    return res.json({msg:'请先登录！'});
  }

  next();
}