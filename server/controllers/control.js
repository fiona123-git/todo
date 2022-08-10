//this creates all the crud operations//
// controllers/todo.js
// this imports the schema//

const Todo = require("../models/Todo");
// this searches the database to get the whole to do list

/*exports.getTodo=(req, res) =>{
    const usertodo = Todo.find({
        user: req.user.id
    })
    .then((todo) => res.json(todo))
        .catch((err) =>
            res
            .status(404)
            .json({
             usertodo
            })
        );
}*/


exports.getAllTodo = (req, res) => {
    Todo.find()
        .then((todo) => res.json(todo))
        .catch((err) =>
            res
            .status(404)
            .json({
                message: "Todo not found",
                error: err.message
            })
        );
};
// this creates to do list
exports.postCreateTodo = (req, res) => {
    Todo.create(req.body)
        .then((data) => res.json({
            message: "Todo added successfully",
            data
        }))
        .catch((err) =>
            res
            .status(400)
            .json({
                message: "Failed to add todo",
                error: err.message
            })
        );
};
//this creates the update request
exports.putUpdateTodo = (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.json({
            message: "updated successfully",
            data
        }))
        .catch((err) =>
            res
            .status(400)
            .json({
                message: "Failed to update todo",
                error: err.message
            })
        );
};





// this create the delete to do
exports.deleteTodo = (req, res) => {
    // this finds and removes by id params and body
    Todo.findByIdAndRemove(req.params.id)
        
    .then((data) =>
            res.json({
                message: "todo deleted successfully",
                data
            })
        )
        .catch((err) =>
            res
            .status(404)
            .json({
                message: "todo not found",
                error: err.message
            })
        );
};