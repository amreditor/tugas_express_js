var express = require("express");
var app = express();

const port = process.env.PORT || 8000;

app.use(express.json);
app.use(express.urlencoded({ extended: true }));

app.post("/api/users", function (req, res) {
  const user_id = req.body.id;
  const token = req.body.token;
  const geo = req.body.geo;

  res.send({
    user_id: user_id,
    token: token,
    geo: geo,
  });
});

function loggers(req, res, next) {
  console.log(new Date(), req.url);
  next();
}

app.use(loggers);

app.get("/", function (req, res) {
  res.send("this is a basic example for express js");
});
app.get("/hello/", function (req, res) {
  res.send("hello page.");
});

// mengambil data parameter dari url
app.get("/api/users", function (req, res) {
  const user_id = req.query.id;
  const token = req.query.token;
  const geo = req.query.geo;

  res.send({
    user_id: user_id,
    token: token,
    geo: geo,
  });
});

app.param("name", function (req, res, next, name) {
  const modifed = name.toUpperCase();
  req.name = modifed;
  next();
});

app.get("/api/users/:name", function (req, res) {
  res.send("Hello " + req.name + "!");
});

var express = app.listen(8000, function () {
  console.log("listenning on port 8000...");
});
