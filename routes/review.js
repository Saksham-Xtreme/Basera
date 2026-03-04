const express= require("express");
const router= express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const ExpressErr = require("../utils/ExpressErr.js");
const Listing = require("../models/listing");
const Review = require("../models/reviews");

const validateReview = (req, res, next) => {
    let result = reviewSchema.validate(req.body);

    console.log(result);

    if (result.error) {
        throw new ExpressErr(400, res.error.details[0].message);
    } else{
        next();
    }
};


// Reviews

router.post("/", async (req, res) => {

    const listing = await Listing.findById(req.params.id);

    const newReview = new Review(req.body.review);
    await newReview.save();

    req.flash("success", "New review created");

    listing.reviews.push(newReview._id);  // 👈 plural
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
});

// Delete route for reviews

router.delete("/:reviewId", wrapAsync(async(req, res) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {review: reviewId} });

    req.flash("deleted", "Review finally Deleted");

    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}));


 
module.exports = router;