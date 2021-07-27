const mongoose = require("mongoose");
const schema = mongoose.Schema;

// add 'maxLength', etc validations
const UserSchema = new schema({

    email:{
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required:true,
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: false
    },

    isAdmin: {
        type: Boolean,
        required: false,
        // important
        default: false
    }


});

module.exports = mongoose.model('User',UserSchema);