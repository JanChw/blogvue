const mongoose = require('mongoose');
module.exports = function(req,res,next){
 res.idIsValid = req => mongoose.Types.ObjectId.isValid(req.params.id);
 res.wrap = cb => {
   try{
     cb();
   }catch(err){
     next(err);
   }
 }
 next();
}