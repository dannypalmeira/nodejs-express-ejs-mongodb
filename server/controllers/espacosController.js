const Espacos = require("../models/Espacos");
const mongoose = require("mongoose");

exports.espacos = async (req, res) => {
    let perPage = 6;
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

        const count = await Espacos.count();

        res.render("espacos/index", {
            locals,
            espacos,
            layout: "../views/layouts/espacos",
            current: page,
            pages: Math.ceil(count / perPage)
        });
        
    } catch (error) {
        console.log(error);
    }
};

exports.espacosViewNote = async (req, res) => {
    try {
        const espaco = await Espacos.findById(req.params.id);
    
        if (espaco) {
          res.render("espacos/view-espaco", {
            espacoID: req.params.id, // Change espacosID to espacoID here
            espaco, // Change espacos to espaco here
            layout: "../views/layouts/espacos",
          });
        } else {
          res.send("Space not found.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

  exports.espacosUpdateNote = async (req, res) => {
    try {
      await Reserva.findOneAndUpdate(
        { _id: req.params.id },
        { nome: req.body.nome, body: req.body.body, updatedAt: Date.now() });
      res.redirect("/espacos");
    } catch (error) {
      console.log(error);
    }
  };
