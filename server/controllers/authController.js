const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

function authController(){
    const _getRedirectUrl = (req) => {
        return req.user.role === 'admin' ? '/dashboard' : '/espacos'
    }
    return {
        login(req, res) {
            res.render('auth/login');
        },
        postLogin(req, res, next){
            const { email, password } = req.body;
            if(!email || !password) {
                req.flash('error', 'Todos os campos devem ser preenchidos!')
                return res.redirect('/login');
            }
            passport.authenticate('local', (err, user, info) =>{
                if(err) {
                    req.flash('error', info.message);
                    return next(err);
                }
                if(!user){
                    req.flash('error', info.message);
                    return res.redirect('/login');
                }
                req.logIn(user, (err) => {     
                    if(err){
                        req.flash('error', info.message);
                        return next(err);
                    }               
                    return res.redirect('/dashboard');
                })
            })(req, res, next);
        },
        register(req, res){
            res.render('auth/register');
        },
        async postRegister(req, res){
            const { nome, email, password } = req.body; 
            try {
                const userExists = await User.findOne({ email: email });
                if(userExists){
                    req.flash('error', 'Este email já está cadastrado.');
                    return res.redirect('/register');
                }
                const hashPassword = await bcrypt.hash(password, 10)
                const user = new User({
                    nome,
                    email,
                    password:hashPassword
            });
            await user.save();
            req.flash('success','Registro realizado com sucesso!');
            return res.redirect('/login');
            } catch (error) {
                req.flash('error', 'Alguma coisa deu errado. Por favor, tente novamente.');
                return res.redirect('/register');
            }
        },
        logout(req, res){
            req.session.destroy(error => {
                if(error) {
                  console.log(error);
                  res.send('Error loggin out');
                } else { 
                    res.redirect('/')
                }; 
              })
        }
    }

};

module.exports = authController;