const mongoose = require('mongoose');

const SantriSchema = mongoose.Schema({
    nama: {
        type: String,
        required: [true, "nama tidak boleh kosong"],
    },
    alamat: {
        type: String,
        required: [true, "alamat tidak boleh kosong"],
    },
    tglTerdaftar: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Santri', SantriSchema)