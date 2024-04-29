const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    nome: {
        type: String,
        required: true
      },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    },
    criarReserva: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reservas'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);