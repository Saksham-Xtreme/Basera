const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
// const Listing = require("../models/listing");
// const Review = require("../models/reviews");
const ReviewControl = require("../controllers/reviews.js");
const { isLoggedIn, validateReview } = require("../middleware.js");

// CREATE REVIEW

router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(ReviewControl.createReview )
);


// DELETE REVIEW

router.delete("/:reviewId",
    isLoggedIn,
    wrapAsync( ReviewControl.deleteReview )
);

module.exports = router;