module.exports = (req,res,next) => {
  let user = req.session.currentUser;
  let { posts,isAdmin } = user;
  console.log(isAdmin);
  console.log(!isAdmin);
  if( isAdmin || posts.includes(req.params.id)){
       next();
       return;
  }
  return res.json({msg:'您无权操作此博客！'});
 
}