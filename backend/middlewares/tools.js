
const bcrypt = require('bcrypt');
module.exports = function(req,res,next){
 res.wrap = cb => {
   try{
     cb();
   }catch(err){
     next(err);
   }
 },
 res.hash = async () => {
    try{
      let _hash = await bcrypt.hash(Date.now()+'',10);
      return encodeURIComponent(_hash);
    }catch(err){
      next(err);
    }
 }

 next();
}