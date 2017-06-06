const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BlogSchema = {
  title:String,
  body:String,
  author:{type:Schema.Types.ObjectId,ref:'User'},
  created:{type:Date,default:Date.now()},
  updated:{type:Date,default:Date.now()},
  meta:{
    type:Schema.Types.Mixed,
    default:{}
  }
};

module.exports = mongoose.model('Blog',BlogSchema);