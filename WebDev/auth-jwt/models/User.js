const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, 'Please enter an email!'],
        unique: true,
        lowercase: true,
        validate: [isEmail,'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an password!'],
        minlength: [4, 'Please enter a password that is >= 4 characters']
    }

});

const User = mongoose.model('user', userSchema);

module.exports = User;