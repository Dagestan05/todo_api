var mongoose = require('mongoose');



mongoose.set("debug", true);


mongoose.connect('mongodb://localhost/todo-api');

mongoose.Promise = Promise;

//when requiring models dir, we actually require todo.js
module.exports.Todo = require("./todo")