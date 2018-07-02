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
// SHOW Route
router.get("/:todoId", function(req, res){
  db.Todo.findById(req.params.todoId) // req.params coiming from route vars
  .then(function(foundTodo){
    res.json(foundTodo)
  })
  .catch(function(err){
    res.send(err);
  })
})

//UPDATE Route
router.put("/:todoId", function(req, res){
  db.Todo.findOneAndUpdate({_id: req.params.todoId}, 
                            req.body,
                            {new: true}
                            )
   // req.params coming from route vars & replace with data
   //coming from req.body
   //new: true // res,send will respond with updated object
  .then(function(updatedTodo){
    res.json(updatedTodo)
  })
  .catch(function(err){
    res.send(err);
  })
})

// DELETE route
router.delete("/:todoId", function(req, res){
  db.Todo.findOneAndRemove({_id: req.params.todoId})
  .then(function(){
    res.json({message: 'Successfully deleted.'})
  })
  .catch(function(err){
    res.send(err);
  })
})




module.exports = router;