const User = require("../models/user.js");

module.exports.postSignUp = async(req,res,next)=>{

    try{

        const {username,email,password} = req.body;

        const newUser = new User({username,email});

        const registeredUser = await User.register(newUser,password);

        req.login(registeredUser,(err)=>{
            if(err){ return next(err); }

            req.flash("success","Welcome to Basera!");
            res.redirect("/listings");
        });

    } catch(e){

        req.flash("errors",e.message);

        res.redirect("/signup");

    }

};

module.exports.renderSignUp = (req,res)=>{

    res.render("users/signup");

};

module.exports.renderLogout = (req,res,next)=>{

    req.logout(function(err){

        if(err){ return next(err); }

        req.flash("success","Logged out successfully");

        res.redirect("/listings");
    });

};

module.exports.renderLogin = (req,res)=>{

    res.render("users/login");

};

module.exports.postLogin = (req,res)=>{

    req.flash("success","Welcome back!");

    let redirectUrl = res.locals.redirectUrl || "/listings";

    res.redirect(redirectUrl);
    
}