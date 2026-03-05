const Listing = require("./models/listing");
const {listingSchema, reviewSchema} = require("./schema.js");
const ExpressErr = require("./utils/ExpressErr.js");



module.exports.isLoggedIn = (req, res, next) => {

    if(!req.isAuthenticated()){

        req.session.redirectUrl = req.originalUrl;

        req.flash("error","You must be logged in");

        return res.redirect("/login");
    }

    next();
};


module.exports.saveRedirectUrl = (req, res, next) => {
 
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }

    next();
};


module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    
    if(!listing.owner.equals(res.locals.currentUser._id)){
        req.flash("deleted", "You don't have permission to edit");
        return res.redirect(`/listings/${id}`);
    }

    next();
    
}; 



module.exports.validateListing = (req, res, next) => {

    console.log(req.body);

    const { error } = listingSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressErr(400, msg);
    }

    next();
};

module.exports.validateReview = (req, res, next) => {
    console.log(req.body);
    let result = reviewSchema.validate(req.body);

    console.log(result);

    if (result.error) {
        throw new ExpressErr(400, res.error.details[0].message);
    } else{
        next();
    }
};
