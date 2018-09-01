var mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.connect("mongodb://razvan:razvan123321@ds251807.mlab.com:51807/razvan_yelpcamp");
mongoose.Promise = Promise; // use promises instead of callbacks

module.exports.Todo = require("./todo");