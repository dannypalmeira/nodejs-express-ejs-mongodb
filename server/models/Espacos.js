const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const espacosSchema = new Schema({
    nome : {
        type: String,
        require: true
    },
    capacidade: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    descricao: {
        type: String,
        require: true
    },
    local: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Espacos', espacosSchema);