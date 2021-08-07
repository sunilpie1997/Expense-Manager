const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ExpenseSchema = new schema({

    amount:{
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: false
    },

    category: {
        type: String,
        required: true
    },

    dateTime: {
        type: Date,
        required:true,
        index: true
    },

    userId: {
        type: schema.Types.ObjectId,
        ref: "User"
    }


});

module.exports = mongoose.model('Expense',ExpenseSchema);