require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const connectDB = require('./server/config/db');
const path = require('path');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    }),
    cookie: {maxAge: 1000 * 60 * 60 * 24}
  })
);

const passportInit = require('./server/config/passport');
passportInit(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use(express.static('public'));

app.use(flash());

app.use((req, res, next) => {
  res.locals.session = req.session
  res.locals.user = req.user
  next()
});


app.use(expressLayout);
app.set('layout', path.join(__dirname, './views/layouts/main'));
app.set('view engine', 'ejs');

require('./server/routes/web')(app);

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, ()=> {
  console.log(`App listeing on port ${port}`)
});
