module.exports = {
  register(req,res){
    res.json({isRegisted:true});
  },
  updateUser(req,res){
    res.json({isUpdated:true});
  },
  login(req,res){
    res.json({isLogined:true});
  },
  logout(req,res){
      res.json({isLogouted:true});
  }
}