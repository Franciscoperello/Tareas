const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    address: String,
    password: String,
    admin: Boolean
});

const User = mongoose.model('user', userSchema);
module.exports=User;