const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = {
  name:String,
  email:String,
  password:String,
  posts:{type:Schema.Types.ObjectId,ref:'Blog'},
  meta:{
    type:Schema.Types.mixed,
    default:{}
  }
}

module.exports = mongoose.model('User',UserSchema);