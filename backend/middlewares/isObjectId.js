const mongoose = require('mongoose');
module.exports = (req,res,next,id) => {

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.json({msg:'此id不存在！'});
  }
  next()
}