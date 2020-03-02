var express = require("express");
const port = 8080
require('./sqlconfig/config.js');
var app = express();
var authMethods=require("./services/authservice.js");
var memberMethods=require("./services/memberservice.js");
var authRoutes=require("./routes/auth.js")(express.Router(),app,authMethods);
var memberRoutes=require("./routes/memberroutes")(express.Router(),app,memberMethods);
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST,DELETE,PUT");
    next();
  });
  app.use('/auth', authRoutes);
  app.use('/member', memberRoutes);
  var server = app.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
})