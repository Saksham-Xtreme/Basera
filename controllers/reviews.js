const Review = require("../models/reviews");
const Listing = require("../models/listing");

module.exports.createReview = async (req, res) => {

    const listing = await Listing.findById(req.params.id);

    const newReview = new Review(req.body.review);

    newReview.author = req.user._id;

    await newReview.save();

    listing.reviews.push(newReview._id);

    await listing.save();

    req.flash("success", "New review created");

    res.redirect(`/listings/${listing._id}`);

}


module.exports.deleteReview = async (req, res) => {

    let { id, reviewId } = req.params;

    const review = await Review.findById(reviewId);

    

    await Listing.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId }
    });

    await Review.findByIdAndDelete(reviewId);

    if(!review.author.equals(req.user._id)){
        req.flash("error","Not authorized");
        return res.redirect(`/listings/${id}`);
    }

    req.flash("deleted", "Review deleted");

    res.redirect(`/listings/${id}`);
}