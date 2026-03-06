const Listing = require("../models/listing.js");  
// const { isLoggedIn , isOwner, validateListing, validateReview} = require("../middleware.js");


module.exports.index= async (req, res) => {
    const allLists = await Listing.find({});
    res.render("lists/index", { allLists });
}

module.exports.renderNewForm= (req, res) => {
    
    res.render("lists/new");
    
}

module.exports.showList=async (req, res) => {

    const { id } = req.params;


    const listing = await Listing
    .findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    })
    .populate("owner"); 


    if (!listing) {
        req.flash("errors", "Listing not avaiable");
        return res.status(404).send("Listing not found");
    }

    res.render("lists/show", { listing });

}


module.exports.createList = async (req, res) => {

    // console.log(req.body);
    // console.log(req.file);   // optional debug

    const newListing = new Listing(req.body.listing);

    // attach uploaded image
    newListing.image = {
        url: req.file.path,
        filename: req.file.filename
    };

    newListing.owner = req.user._id;

    await newListing.save();

    req.flash("success", "New listing created");
    res.redirect("/listings");
};

module.exports.editList = async (req, res) => {

    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) { 
        req.flash("errors", "Listing not found");
        return res.redirect("/listings");
    }

   

    // create smaller preview image for edit page
    let originalImageUrl = listing.image.url;
    let previewImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

    res.render("lists/edit", { listing, previewImageUrl });
};

module.exports.updateList = async (req, res) => {

    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });

    if (typeof req.file !== "undefined") {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
        await listing.save();
    } 

    req.flash("updated", "Listing updated");

    res.redirect(`/listings/${id}`);

};


module.exports.deleteList = async(req, res) => {
    let { id } = req.params;
    req.flash("deleted", "Listing finally Deleted");
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}

module.exports.getBook = async (req, res) => {

    console.log("get book working");

    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    res.render("lists/book", { listing });
}
module.exports.postBook = async (req, res) => {

    const { checkin, checkout, guests } = req.body.booking;

    const listing = await Listing.findById(req.params.id);

    console.log({
        listing: req.params.id,
        user: req.user._id,
        checkin,
        checkout,
        guests
    });

    req.flash("success", "Booking successful!");

    res.render("lists/thanks", { listing });
};