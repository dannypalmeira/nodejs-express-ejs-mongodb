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
        const espacos = await Espacos.aggregate([
            { $sort: { updatedAt: -1 } },
            {
                $project: {
                    nome: { $substr: [ "$nome", 0, 30 ] },
                    descricao: { $substr: [ "$descricao", 0, 2000 ] },
                    image: { $substr: [ "$image", 0, 100 ] },
                    local: { $substr: [ "$local", 0, 100 ] },
                    capacidade: { $substr: [ "$capacidade", 0, 3 ] },
                },
            }
        ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Espacos.countDocuments();

        res.render('espacos', {
            locals,
            espacos,
            current: page,
            pages: Math.ceil(count / perPage)
        });
        
    } catch (error) {
        console.log(error);
    }
};
