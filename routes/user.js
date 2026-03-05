const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

// signup page
router.get("/signup",(req,res)=>{
    res.render("users/signup");
});

// login page
router.get("/login",(req,res)=>{
    res.render("users/login");
});

// logout
router.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){ return next(err); }

        req.flash("success","Logged out successfully");
        res.redirect("/listings");
    });
});


// login
router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true
    }),
    (req,res)=>{

        req.flash("success","Welcome back!");

        let redirectUrl = res.locals.redirectUrl || "/listings";

        res.redirect(redirectUrl);
    }
);

 
// signup
router.post("/signup",
wrapAsync(async(req,res,next)=>{

    try{

        const {username,email,password} = req.body;

        const newUser = new User({username,email});

        const registeredUser = await User.register(newUser,password);

        req.login(registeredUser,(err)=>{
            if(err){ return next(err); }

            req.flash("success","Welcome to Basera!");
            res.redirect("/listings");
        });

    }catch(e){

        req.flash("errors",e.message);
        res.redirect("/signup");

    }

}));

module.exports = router;