const mongoose = require('mongoose');

// Creating Schema
const listItemSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    }
});

// giving name to the collection that will be made using the schema defined above
// first letter of model name(or collection name) is capital by naming convention
const ListItem = mongoose.model("ListItem", listItemSchema);

// exporting this collection
module.exports = ListItem;