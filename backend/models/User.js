const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = {
  name:String,
  email:String,
  password:String,
  isAdmin:{type:Boolean,default:false},
  isActived:{type:Boolean,default:false},
  posts:[{type:Schema.Types.ObjectId,ref:'Blog'}],
  meta:{
    type:Schema.Types.Mixed,
    default:{}
  }
}

module.exports = mongoose.model('User',UserSchema);