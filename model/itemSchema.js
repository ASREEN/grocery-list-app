const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    priority: { type: String, requierd: true, min: 0, max: 5, default: 'none'},
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now() }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;