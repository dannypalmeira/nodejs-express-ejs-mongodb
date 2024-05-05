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

exports.dashboard = async (req, res) => {
    const locals = {
        title: "Dashboard - Reservas | Grupo O",
        description: "Página de Reservas"
    }
    res.render('dashboard', locals);
}