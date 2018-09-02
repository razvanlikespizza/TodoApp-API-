var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    todoRoutes = require("./routes/todos");

app.use(bodyParser.json()); //adding body parser to acces req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api/todos", todoRoutes);
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/node_modules/siimple/dist"));

app.get("/", function(req, res) {
  res.sendFile("index.html");
});


app.listen(8080, function() {
  console.log("==========START============");
});
