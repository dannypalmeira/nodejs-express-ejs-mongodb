const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.homepage = async (req, res) => {
    const locals = {
        title: "Reservas | Grupo O",
        description: "Página de Reservas",
    }
    res.render('index', {
        locals,
        layout: '../views/layouts/front-page'
    });
}

exports.about = async (req, res) => {
    const locals = {
        title: "About - Reservas | Grupo O",
        description: "Página de Reservas"
    }
    res.render('about', locals);
}

<<<<<<< HEAD
=======
exports.login = async (req, res) => {
    const locals = {
        title: "Login - Reservas | Grupo O",
        description: "Página de Reservas"
    }
    res.render('login', locals);
}

exports.signup = async (req, res) => {
    const locals = {
        title: "Cadastro - Reservas | Grupo O",
        description: "Página de Reservas"
    }
    res.render('signup', locals);
}

>>>>>>> 91f3ddd5ae7d750f4fb0f33f07a56fd7b622ff59
exports.dashboard = async (req, res) => {
    const locals = {
        title: "Dashboard - Reservas | Grupo O",
        description: "Página de Reservas"
    }
    res.render('dashboard', locals);
}