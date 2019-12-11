const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const OderSo = require('./models/oderSo');

const MONGO_URI = "mongodb+srv://malte:4UCVZ0YKjQtNLauI@cluster0-5qdd5.mongodb.net/oderSo?retryWrites=true&w=majority";
// const MONGO_URI = process.env.MONGO_URI;
const MY_SECRET = "my secret";

const store = new MongoDBStore({
  uri: MONGO_URI,
  collection: 'sessions'
}); 

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({ secret: MY_SECRET, resave: false, saveUninitialized: false, store: store })
);


app.use('/admin', adminRoutes)
app.use('/user', userRoutes)
app.get('/', function (req, res) {
  res.redirect('/user');
});

mongoose.connect(MONGO_URI, 
{useNewUrlParser: true}).then(
  result => {
    app.listen(3000);
  }
).catch(err => {
  console.log(err);
})

