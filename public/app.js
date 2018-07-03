$(document).ready(function(){
  $.getJSON('/api/todos')
  .then(addTodos)

  $('#todoInput').keypress(function(e) {
    if (e.which == 13) {
      createTodo();
    }})
  
  $('.list').on('click', 'span', function(e){
    //stopPropagation() so that click on span dont trigger event on li
    e.stopPropagation();
    removeTodo($(this).parent())
  })
  //toggling completion
  $('.list').on("click", 'li', function(){
    updateTodo($(this)) // $(this) == 'li'
  })
})

function addTodos(todos) {
  //add todos to the page
  todos.forEach(function(todo){
    addTodo(todo)
  });
}

function addTodo(todo){
  var newTodo = $("<li class='task'>" + todo.name + "<span>X</span></li>");
  newTodo.data('id', todo._id) // .data is special jq method to store var's info for later use
  newTodo.data('completed', todo.completed) // needed for toggling
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
    $('#todoInput').val(' ');
    addTodo(newTodo);
  })
  .catch(function(err){
    console.log(err)
  })
}

function removeTodo(todo) {
  var clickedId = todo.data('id');
  var deleteUrl = '/api/todos/' + clickedId;
  
  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
  .then(function(data){
    // removing from ui
    todo.remove();
  })
  .catch(function(err){
    console.log(err)
  })
}

function updateTodo(todo) {
  var updateUrl = '/api/todos/' + todo.data('id');
  var isCompleted = !todo.data('completed');
  var updateData = {completed: isCompleted}
  $.ajax({
    method: "PUT",
    url: updateUrl,
    data: updateData
  })
  .then(function(updatedTodo){
    todo.toggleClass('done');
    todo.data("completed", isCompleted)
  })
}