const mongoose = require('mongoose');

const model = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    file: { type: Buffer, required: true },
    email: {
        type: String,
        required: true
    }
  
});

const User = mongoose.model("User", model);
module.exports = User;