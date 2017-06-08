const mongoose = require('mongoose');
module.exports = function(req,res,next){
 res.wrap = cb => {
   try{
     cb();
   }catch(err){
     next(err);
   }
 }
 next();
}