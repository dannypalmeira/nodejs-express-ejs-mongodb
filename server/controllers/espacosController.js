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
        const espaco = await Espacos.aggregate([
            { $sort: { updatedAt: -1 } },
            {
                $project: {
                    nome: { $substr: [ "$nome", 0, 30 ] },
                    descricao: { $substr: [ "$descricao", 0, 300 ] },
                    image: { $substr: [ "$image", 0, 2000 ] },
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
            espaco,
            layout: "../views/layouts/main",
            current: page,
            pages: Math.ceil(count / perPage)
        });
        
    } catch (error) {
        console.log(error);
    }
};

exports.espacosView = async (req, res) => {
    try {
        const espaco = await Espacos.findById(req.params.id);
        console.log(espaco);
    
        if (espaco) {
          res.render("espacos/view-espacos", {
            espacoID: req.params.id, 
            espaco, 
            layout: "../views/layouts/main",
          });
        } else {
          res.send("Space not found.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

  exports.espacosUpdate = async (req, res) => {
    try {
      await Espacos.findOneAndUpdate(
        { _id: req.params.id },
        { nome: req.body.nome, descricao: req.body.descricao, updatedAt: Date.now() });
      res.redirect("/espacos");
    } catch (error) {
      console.log(error);
    }
  };

  exports.espacosSearch = async (req, res) => {
    try {
      res.render("espacos/search", {
        searchResults: "",
        layout: "../views/layouts/main",
      });
    } catch (error) {}
  };
  
  exports.espacosSearchSubmit = async (req, res) => {
    try {
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
  
      const searchResults = await Espacos.find({
        $or: [
          { nome: { $regex: new RegExp(searchNoSpecialChars, "i") } },
          { descricao: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        ]});
  
      res.render("espacos/search", {
        searchResults,
        layout: "../views/layouts/main",
      });
    } catch (error) {
      console.log(error);
    }
  };
