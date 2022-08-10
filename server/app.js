//add express server
const express = require("express");

const connectDB = require("./config/db"); //added config
const cors = require("cors"); //added cors
const app = express(); //express server

const todo = require("./routes/todo"); // added
//const user= require("./routes/user")

const bodyParser = require('body-parser')
//cors added
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// connect database

connectDB(); //added

app.use("/api/todo", todo);
//app.use("/signin", user)
//app.use("/signup", user)

app.use(cors({
    origin: true,
    credentials: true
}));

// initialize middleware
app.use(express.json({
    extended: false
}));
app.get("/", (req, res) => res.send("Server up and running"));

// use routes


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});




// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is listening on 8000 `);
})

module.exports = app