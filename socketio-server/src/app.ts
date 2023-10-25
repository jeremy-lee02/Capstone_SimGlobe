var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
import * as cors from "cors";
import "reflect-metadata";
require("dotenv").config();

const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");
const lectureRoutes = require("./routes/lecture");
const settingRoutes = require("./routes/setting");
const authRoutes = require("./routes/auth");
const roomRoutes = require("./routes/room");
var indexRouter = require("./routes/index");

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// routes
app.use("/", indexRouter);
app.use("/api/users", userRoutes);
app.use("/api/auth/admin", adminRoutes);
app.use("/api/lecture", lectureRoutes);
app.use("/api/setting", settingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
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

export default app;
