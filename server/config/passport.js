const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

function init (passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' },
    async (email, password, done) => {
            const user = await User.findOne({ email: email });

            if(!user) {
                return done (null, false, { message: "Este email não está cadastrado." });
            }

            bcrypt.compare(password,user.password).then(match=>{
            if(match){
                return done(null, user,{ message : 'Logged in Successfully'})
            }
            return done(null, false,{ message : 'Dados incorretos, tente novamente.'})
        }).catch(err=>{
            return done(null, false, { message: 'Alguma coisa não está correta.'})
        })
      }
    ));

    passport.serializeUser((user, done) => {
        done (null, user._id);
    })

    passport.deserializeUser(async (id, done) => {
        try {
          const user = await User.findById(id);
          done(null, user);
        } catch (error) {
          done(error);
        }
      });
}

module.exports = init;