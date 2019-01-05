const mongoose = require('mongoose');


//  Will add owner when user management is added
const budgetSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    amount: Number,
    category: String,
    al_identifier: String
});

module.exports = mongoose.model('Budget', budgetSchema);