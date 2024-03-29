//Libraries
var express = require("express");
var passport = require("passport");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var path = require("path");
var cors = require("cors");
var bodyParser = require("body-parser");
require("dotenv").config();
// const auth = require("./routes/auth/authentication");
//Self Created Modules.
var home = require("./routes");
var db = require("./Database/index");
var login = require("./routes/auth/login");
var signup = require("./routes/auth/signup");
var patienthome = require("./routes/patient/patient");
var doctorhome = require("./routes/doctor/doctor");
const port = 5000;
const app = express();
app.use(morgan("dev"));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.SECRET_COOKIE));
// API routes Defined Here.
app.use("", home);
app.use("/auth", signup);
app.use("/auth", login);
app.use("/patient", patienthome);
app.use("/doctor", doctorhome);
//Send Back Error Response.
app.use(function (err, req, res, next) {
    res.status = err.status || 500;
    res.json({
        message: err.message,
        error: req.app.get("env") === "development" ? err : {},
    });
});
// App Listening
app.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=server.js.map