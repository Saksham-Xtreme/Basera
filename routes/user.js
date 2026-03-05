const express = require("express");
const router = express.Router();
// const User = require("../models/user.js");

const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const UserControl = require("../controllers/user.js");

// signup page
router.get("/signup",UserControl.renderSignUp);

// login page
router.get("/login", UserControl.renderLogin);

// logout  
router.get("/logout", UserControl.renderLogout);


// login
router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true
    }), UserControl.postLogin
    
);


// signup

router.post("/signup",
wrapAsync(UserControl.postSignUp));

module.exports = router;