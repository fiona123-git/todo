// models/todo.js
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
     user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
     },
    task: {
        type: "String",
        required: true,
    },
    
});

const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;