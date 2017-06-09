const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = {
  name:String,
  email:String,
  password:String,
  isAdmin:{type:Boolean,default:false},
  isActived:{type:Boolean,default:false},
  activeExpires:{type:Date,default:(Date.now()+12*60*60*1000)},
  activeToken:String,
  posts:[{type:Schema.Types.ObjectId,ref:'Blog'}],
  meta:{
    type:Schema.Types.Mixed,
    default:{}
  }
}

module.exports = mongoose.model('User',UserSchema);