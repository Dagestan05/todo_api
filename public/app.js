$(document).ready(function(){
  $.getJSON('/api/todos')
  .then(addTodos)

  $('#todoInput').keypress(function(e) {
    if (e.which == 13) {
      createTodo();
      return false;    //<---- Add this line
    }})

})

function addTodos(todos) {
  //add todos to the page
  todos.forEach(function(todo){
    addTodo(todo)
  });
}

function addTodo(todo){
  var newTodo = $("<li class='task'>" + todo.name +  "</li>");
    // newTodo.completed ? newTodo.addClass('done') : newTodo;
    if (todo.completed) {
      newTodo.addClass('done');
    }
    $('.list').append(newTodo);
}
function createTodo() {
  // send request to create new todo
  var userInput = $('#todoInput').val();
  $.post('/api/todos', {name: userInput})
  .then(function(newTodo){
    $('#todoInput').val('');
    addTodo(newTodo);
  })
  .catch(function(err){
    console.log(err)
  })
}