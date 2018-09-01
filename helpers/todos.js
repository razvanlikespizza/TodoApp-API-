var db = require("../models");

exports.getTodos = function(req, res) {
  db.Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.send(err));
}
exports.addTodo = function(req, res) {
  db.Todo.create(req.body)
    .then(todo => res.json(todo))
    .catch(err => res.send(err));
}
exports.getTodo = function(req, res) {
  db.Todo.findById(req.params.id)
    .then(todo => res.json(todo))
    .catch(err => res.send(err));
}
exports.updateTodo = function(req, res) {
  db.Todo.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(todo => res.json(todo))
    .catch(err => res.send(err));
}
exports.deleteTodo = function(req, res) {
  db.Todo.remove({_id: req.params.id})
    .then(todo => res.json(todo))
    .catch(err => res.send(err));
}
module.exports = exports;