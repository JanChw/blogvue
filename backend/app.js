require('./servers/db');

const express = require('express');
const cookie = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const api = require('./api/v1/api');
const tools = require('./middlewares/tools');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cookie());
app.use(session({
  secret:'blogvue',
  resave:false,
  saveUninitialized:false
}));
app.use(tools);
app.use(api);

app.use((err,req,res,next)=>{
  console.error(err.stack);
  res.status(500).send('something broke!');
})
app.listen(3000,()=>{
  console.log('server starting on port 3000')
});