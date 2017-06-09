require('./servers/db');

const express = require('express');
const cookie = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');

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

app.use(cookie());
app.use(session({
  secret:'blogvue',
  resave:false,
  saveUninitialized:false
}));
app.use(tools);
// app.use("*/:id",isObjectId);

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