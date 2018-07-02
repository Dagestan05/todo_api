var express = require('express');
var router = express.Router();

var db = require("../models")

// GET route
router.get("/", function(req, res){
  db.Todo.find()
  .then(function(todos){
    res.json(todos);
  })
  .catch(function(err){
    res.send(err);
  })
})

// POST route
router.post('/', function(req, res){
  db.Todo.create(req.body) // req.body -> object coming from bodyParser
  .then(function(newTodo){
    res.status(201).json(newTodo); //  status201 == created
  })
  .catch(function(err){
    res.send(err);
  })
});


module.exports = router;