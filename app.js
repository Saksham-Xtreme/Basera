const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
 

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/AirBnb";

// DB + Server

async function main() {

    await mongoose.connect(MONGO_URL);

    console.log("Connected to DB");

    app.listen(8080, () => {

        console.log("Server is listening on port 8080");

    });

}

const sessionOptions = {
    secret : "sakshamwillbebest",
    resave : false,
    saveUninitialized : true,

    cookie : {

        expires : Date.now() + 7*24*3600*1000,

        maxAge : 7*24*3600*1000,
        httpOnly : true,

    }
};
  
main().catch(err => console.log(err));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.updated = req.flash("updated");
    res.locals.deleted = req.flash("deleted");
    next();
});

app.engine('ejs', ejsMate);





// Home
app.get("/", (req, res) => {
    res.render("lists/home.ejs");
});

// Listing

app.use("/listings", listings); 

// reviews

app.use("/listings/:id/reviews", reviews);

 
// 404 handler
app.use((req, res) => {

    res.status(404).render("error/404");

});

// General error handler
app.use((err, req, res, next) => {

    let { statusCode = 500, message = "Something went wrong" } = err;

    let y = err;
    
    if (statusCode === 400) {

        return res.status(400).render("error/400");
    }

    if (statusCode === 404) {
        return res.status(404).render("error/404");
    }



    res.status(statusCode).send(message);

});

app.use((err, req, res, next) => {

    let {statusCode, message} = err;

    res.status(statusCode).send(message);

});