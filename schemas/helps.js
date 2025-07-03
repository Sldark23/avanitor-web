const mongoose = require('mongoose');

const helpSchema = new mongoose.Schema({
    comando: { type: String, required: true },
    categoria: { type: String, required: true },
    descricao: { type: String, required: true }
});

module.exports = mongoose.model('Helps', helpSchema);