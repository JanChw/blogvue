const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const URL = "mongodb://localhost/demo";

mongoose.connect(URL,()=>{
  console.log('database connected');
});