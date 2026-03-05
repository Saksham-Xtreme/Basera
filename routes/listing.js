const express= require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const Listing = require("../models/listing");
const { isLoggedIn , isOwner, validateListing, validateReview} = require("../middleware.js");

const ListingControl = require("../controllers/listings.js");
 
// Index route
router.get("/",  wrapAsync(ListingControl.index));

// new route : to add new property , this is put above show route cause 
// app thinks new is also a id

router.get("/new", isLoggedIn, ListingControl.renderNewForm);

// Show route

router.get("/:id",  wrapAsync(ListingControl.showList));

// Create Route ,
// this helps to Post a new listing in the database

router.post(
    "/",
    isLoggedIn,
    wrapAsync(ListingControl.createList)
);

// Edit route , to do changes in the file

router.get("/:id/edit", isLoggedIn, isOwner,  wrapAsync(ListingControl.editList));


// Update route , to save and update the edited list

router.put("/:id", isLoggedIn, isOwner, wrapAsync(ListingControl.updateList));

// Delete route , this will delete the listing

router.delete("/:id",  isLoggedIn, isOwner, wrapAsync(ListingControl.deleteList));

module.exports = router;
