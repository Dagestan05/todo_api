var db = require('../models');

//GET
exports.getTodos =  function(req, res){
  db.Todo.find()
  .then(function(todos){
    res.json(todos);
  })
  .catch(handleErrors)
}
//POST
exports.createTodo = function(req, res){
  db.Todo.create(req.body) // req.body -> object coming from bodyParser
  .then(function(newTodo){
    res.status(201).json(newTodo); //  status201 == created
  })
  .catch(handleErrors)
}
//SHOW
exports.showTodo = function(req, res){
  db.Todo.findById(req.params.todoId) // req.params coiming from route vars
  .then(function(foundTodo){
    res.json(foundTodo)
  })
  .catch(handleErrors)
}
//UPDATE
exports.updateTodo = function(req, res){
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
  .catch(handleErrors)
}

// DELETE
exports.deleteTodo = function(req, res){
  db.Todo.findOneAndRemove({_id: req.params.todoId})
  .then(function(){
    res.json({message: 'Successfully deleted.'})
  })
  .catch(handleErrors)
}

function handleErrors(err) {
  res.send(err);
}

module.exports = exports;