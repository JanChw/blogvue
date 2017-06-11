require('./servers/db');

const express = require('express');
const cookie = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session); 
const morgan = require('morgan');
const cors = require('cors');


const api = require('./api/v1/api');
const tools = require('./middlewares/tools');
const isObjectId = require('./middlewares/isObjectId');
const fs = require('fs');
const util = require('util');

const app = express();

let accessLogStream = fs.createWriteStream('./access.log', {flags: 'a'});
app.use(morgan('short', {stream: accessLogStream}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

let corsOption = {
  origin: ['http://localhost:1212'],
  methods:["GET","PATCH","POST","DELETE"],
  credentials:true,
  preflightContinue:true,
  optionsSuccessStatus: 200 
};
app.use(cors(corsOption));

app.use(cookie());
app.use(session({
  secret:'blogvue',
  store:new MongoStore({
    mongooseConnection:mongoose.connection,
    ttl:24*60*60*1000
  }),
  resave:false,
  saveUninitialized:false,
  // rolling: true,
  // unset: 'destroy',
  cookie:{
    // secure:true,
    // httpOnly:false,
    maxAge:24*60*60*1000
  }
}));
app.use(tools);


app.use(api);

app.use(async (err,req,res,next)=>{
  // console.error(err.stack);
  
let writeStream = fs.createWriteStream('./error.log',{flags:'a'});
  // let isWriting = writeStream.write(err.stack);
//  await writeStream.end(err.stack);
// writeStream.cork();
writeStream.write(err.message);
writeStream.write('\n');
writeStream.write('===========================================\n');
// writeStream.uncork();
writeStream.end();

  res.status(500).send('something broke!');
})
app.listen(3000,()=>{
  console.log('server starting on port 3000')
});
