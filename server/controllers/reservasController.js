const Reservas = require("../models/Reservas");
const mongoose = require("mongoose");

exports.homepage = async (req, res) => {
  const messages = await req.flash("info");

  const locals = {
    title: "Reservas | Grupo O",
    description: "Faça sua reserva hoje mesmo!",
  };

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const reservas = await Reservas.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Reservas.countDocuments({});

    res.render("index", {
      locals,
      reservas,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.about = async (req, res) => {
  const locals = {
    title: "About",
    description: "Faça sua reserva hoje mesmo!",
  };

  try {
    res.render("about", locals);
  } catch (error) {
    console.log(error);
  }
};

exports.addReserva = async (req, res) => {
  const locals = {
    title: "Addicionar uma reserva",
    description: "Faça sua reserva hoje mesmo!",
  };

  res.render("reservas/add", locals);
};


exports.postReserva = async (req, res) => {
  console.log(req.body);

  const novaReserva = new Reservas({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
  });

  try {
    await Reservas.create(novaReserva);
    await req.flash("info", "New customer has been added.");

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};


exports.view = async (req, res) => {
  try {
    const reservas = await Reservas.findOne({ _id: req.params.id });

    const locals = {
      title: "View Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("reservas/view", {
      locals,
      reservas,
    });
  } catch (error) {
    console.log(error);
  }
};


exports.edit = async (req, res) => {
  try {
    const reservas = await Reservas.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("reservas/edit", {
      locals,
      reservas,
    });
  } catch (error) {
    console.log(error);
  }
};


exports.editPost = async (req, res) => {
  try {
    await Reservas.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now(),
    });
    await req.flash("info", "Atualizado.");
    await res.redirect("/");    
  } catch (error) {
    console.log(error);
  }
};

exports.deleteReserva = async (req, res) => {
  try {
    await Reservas.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

exports.searchReserva = async (req, res) => {
  const locals = {
    title: "Search Customer Data",
    description: "Free NodeJs User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const reservas = await Reservas.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      reservas,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
