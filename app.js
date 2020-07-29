var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// .env file
require("dotenv").config();

// MONGOOSE
var mongoose = require("mongoose");

// JSON WEB TOKENS
const jwt = require("jsonwebtoken");

var app = express();

// Setting SECRET KEY
app.set("secretKey", "TPNode");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// Middleware
function validateUser(req, res, next) {
  console.log(req.app.get("secretKey"));
  jwt.verify(req.headers["x-access-token"], req.app.get("secretKey"), function (
    err,
    decoded
  ) {
    if (err) {
      res.json({ message: err.message });
    } else {
      console.log(decoded);
      req.body.userToken = decoded;
      next();
    }
  });
}
app.validateUser = validateUser;

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// DB Config
const db = require("./config/mongodb").MongoURI;

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));

module.exports = app;
