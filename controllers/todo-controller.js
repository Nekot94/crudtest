const Todo = require("../models/mtodo");

const getTodos = (req, res) => {
  Todo.find().then((err, todos) => {
    if (err) {
      res.send(err);
    }
    res.json(todos);
  });
};


const createTodo = (req, res) => {

  console.log(req)

  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  });

  console.log(todo)

  todo.save().then((err, todo) => {
    if (err) {
      res.send(err);
    }
    res.json(todo);
  });
};

const updateTodo = (req, res) => {
  Todo.findOneAndUpdate(
    { _id: req.params.todoID },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
      },
    },
    { new: true }).then(
    (err, Todo) => {
      if (err) {
        res.send(err);
      } else res.json(Todo);
    }
  );
};

const deleteTodo = (req, res) => {
  Todo.deleteOne({ _id: req.params.todoID })
    .then(() => res.json({ message: "Todo Deleted" }))
    .catch((err) => res.send(err));
};



  
  module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo 
  };