var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    todoRoutes = require("./routes/todos"),
    https = require ("https");
const PROD = false;
const lex = require('greenlock-express').create({
  version: 'draft-11',
  server: PROD ? 'https://acme-v02.api.letsencrypt.org/directory' : 'https://acme-staging-v02.api.letsencrypt.org/directory',
  approveDomains: (opts, certs, cb) => {
    if (certs) {
      // change domain list here
      opts.domains = ['raz.h4ck.me', '176.126.189.55']
    } else { 
      // change default email to accept agreement
      opts.email = 'razvanro666@gmail.com'; 
      opts.agreeTos = true;
    }
    cb(null, { options: opts, certs: certs });
  }
  // optional: see "Note 3" at the end of the page
  // communityMember: true
});
const middlewareWrapper = lex.middleware;

app.use(bodyParser.json()); //adding body parser to acces req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api/todos", todoRoutes);
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/node_modules/siimple/dist"));

app.get("/", function(req, res) {
  res.sendFile("index.html");
});

https.createServer(
  lex.httpsOptions, 
  middlewareWrapper(handler)
).listen(8080);
/*app.listen(8080, function() {
  console.log("==========START============");
});*/
