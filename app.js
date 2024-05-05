require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const connectDB = require('./server/config/db');
<<<<<<< HEAD
const path = require('path');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
=======
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
>>>>>>> 91f3ddd5ae7d750f4fb0f33f07a56fd7b622ff59
const MongoStore = require('connect-mongo');

const app = express();
const port = process.env.PORT || 5000;

<<<<<<< HEAD
connectDB();

app.use(session({
    secret: process.env.COOKIE_SECRET,
=======
app.use(
  session({
    secret: 'secret secret',
>>>>>>> 91f3ddd5ae7d750f4fb0f33f07a56fd7b622ff59
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    }),
<<<<<<< HEAD
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
=======
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 semana
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

connectDB();

app.use(express.static('public'));

app.use(flash({ sessionKeyName: 'flashMessage' }));

app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));
app.use('/', require('./server/routes/reservas'));
>>>>>>> 91f3ddd5ae7d750f4fb0f33f07a56fd7b622ff59

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, ()=> {
  console.log(`App listeing on port ${port}`)
});
