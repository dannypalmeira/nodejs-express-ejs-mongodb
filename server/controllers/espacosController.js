const Espacos = require("../models/Espacos");
const Reservas = require("../models/Reservas");
const mongoose = require("mongoose");

exports.espacos = async (req, res) => {
    let perPage = 12;
    let page = req.query.page || 1;

    const locals = {
        title: "Espaços para Reserva",
        description: "Reservas | Grupo O",
    };

    try {
        const reserva = await Reservas.aggregate([
            { $sort: { updatedAt: -1 } },
            {
                $project: {
                    title: { $substr: [ "$title", 0, 30 ] },
                    body: { $substr: [ "$body", 0, 100 ] },
                },
            }
        ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Reservas.countDocuments();

        res.render('espacos', {
            locals,
            reserva,
            current: page,
            pages: Math.ceil(count / perPage)
        });
        
    } catch (error) {
        console.log(error);
    }
};