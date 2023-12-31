const mongoose = require('mongoose');
const dbName = "todo";

mongoose.connect(`dbUrl/${dbName}`);

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

const todo = mongoose.model('todo', todoSchema);

module.exports = {
    todo
}