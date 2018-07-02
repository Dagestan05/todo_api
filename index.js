var express = require('express'),
    bodyParser = require("body-parser"),
    app = express(),
    port = process.env.PORT || 3000;


var todoRoutes = require("./routes/todos")

// bodyParser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))



app.get("/", function(req, res){
  res.json({message: "Hej from Express"})
})
//use api routes
app.use("/api/todos", todoRoutes);







//server
app.listen(port, function(){
  console.log('Server running on port ' + port)
})