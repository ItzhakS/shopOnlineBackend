const express = require('express');
const get = require('./routes/get');
const post = require('./routes/post');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

mongoose.Promise = global.Promise;


const app = express();

function verifyToken(req, res, next){
  if(!req.headers.authorization) return res.status(401).send('Unauthorized Request');
  const token = req.headers.authorization.split(' ')[1];
  if(token === 'null') return res.status(401).send('Unauthorized Request');
  const payload = jwt.verify(token, 'bananas');
  if(!payload)return res.status(401).send('Unauthorized Request');
  next()

}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', auth);
app.use('/api', post, verifyToken);
app.use('/api', get, verifyToken);  

app.listen(9090, ()=>{
  console.log('Listening 9090...');
})

mongoose.connect('mongodb://localhost/shopping', { useNewUrlParser: true })
.then(()=>{
  console.log('Database Connected...');
}).catch(()=>{
  console.log('Database Did Not Connect...');

});