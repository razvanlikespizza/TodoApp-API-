var mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/todoapi");
mongoose.Promise = Promise; // use promises instead of callbacks

module.exports.Todo = require("./todo");