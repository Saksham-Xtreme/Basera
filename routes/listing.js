const express= require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const ExpressErr = require("../utils/ExpressErr.js");
const Listing = require("../models/listing");


const validateListing = (req, res, next) => {
    let result = listingSchema.validate(req.body);

    console.log(result);

    if (result.error) {
        throw new ExpressErr(400, res.error.details[0].message);
    } else{
        next();
    }
};

// Index route
router.get("/", wrapAsync(async (req, res) => {
    const allLists = await Listing.find({});
    res.render("lists/index", { allLists });
}));

// new route : to add new property , this is put above show route cause 
// app thinks new is also a id
router.get("/new", (req, res) => {
    res.render("lists/new");
});


// Show route

router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;

    const listing = await Listing
        .findById(id)
        .populate("reviews");  // 👈 must match schema exactly

    if (!listing) {
        return res.status(404).send("Listing not found");
    }

    res.render("lists/show", { listing });
}));

// Create Route ,
// this helps to Post a new listing in the database

router.post("/",
    
    wrapAsync(async (req, res) => {

        

        const newListing = new Listing(req.body.listing);
        await newListing.save();
        req.flash("success", "New listing created");

        res.redirect("/listings");

       
    })
);

// Edit route , to do changes in the file
router.get("/:id/edit", wrapAsync(async(req, res)=> {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    // req.flash("success", "Listing finally edited");
    res.render("lists/edit", {listing});
}));


// Update route , to save and update the edited list

router.put("/:id", wrapAsync(async(req, res)=> {
    let { id } = req.params;
    req.flash("updated", "Listing finally updated");
    await Listing.findByIdAndUpdate(id, req.body.listing); 
    res.redirect("/listings");
}));

// Delete route , this will delete the listing

router.delete("/:id", wrapAsync(async(req, res) => {
    let { id } = req.params;
    req.flash("deleted", "Listing finally Deleted");
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

module.exports = router;
