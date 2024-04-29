const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; 
const bcrypt = require("bcryptjs");
const User = require("../models/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', 
      passwordField: 'password',
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'Usuário não existe!' });
        }
        
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
          return done(null, false, { message: 'A senha não é correta!' });
        }
        
        return done(null, user._id);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/dashboard", 
    failureFlash: true
  })
);

router.get('/login-failure', (req, res) => {
  const errorMessage = res.flash("error")[0] || 'Something went wrong...';
  res.send(errorMessage);
});


passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true 
    },
    async function (req, email, password, done) {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return done(null, false, { message: 'Email is already registered.' });
        }

        const hasdPsw = await bcrypt.hash(password, 10);

        const newUser = new User({
          nome: req.body.nome,
          email,
          password: hasdPsw,
        });

        await newUser.save();

        return done(null, newUser);
      } catch (error) {
        console.log(error);
      }
    }
  )
);


router.post(
  '/signup',
  passport.authenticate('signup', {
    successRedirect: '/dashboard', 
    failureRedirect: '/signup-failure', 
    failureFlash: true 
  })
);

router.get('/logout', (req, res) => {
  req.session.destroy(error => {
    if(error) {
      console.log(error);
      res.send('Error loggin out');
    } else { 
  res.redirect('/')
    }; 
  })
});


passport.serializeUser(function (user, done) {
  done(null, user._id);
});


passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});


module.exports = router;
