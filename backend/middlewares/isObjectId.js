const mongoose = require('mongoose');
module.exports = (req,res,next,id) => {
  if(!mongoose.Types.ObjectId.isValid(id)){
     next(new Error('此id不存在！'));
     return;
    // return res.json({msg:'此id不存在！'});
  }
  next();
}