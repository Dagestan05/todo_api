var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;


app.get("/", function(req, res){
  res.json({message: "Hej from Express"})
})

app.listen(port, function(){
  console.log('Server running on port ' + port)
})