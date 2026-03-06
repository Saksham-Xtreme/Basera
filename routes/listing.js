if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express= require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const Listing = require("../models/listing");
const { isLoggedIn , isOwner, validateListing, validateReview} = require("../middleware.js");

const ListingControl = require("../controllers/listings.js");

const multer = require("multer");
const { storage } = require("../cloudConfig");

const upload = multer({ storage });

// console.log(storage);

router.get("/new", isLoggedIn, ListingControl.renderNewForm);

router.get("/:id/edit", isLoggedIn,  isOwner,  wrapAsync(ListingControl.editList));

router
    .route("/")
    // Index route
    .get( wrapAsync(ListingControl.index))
    // Create Route 
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        wrapAsync(ListingControl.createList)
    );
    

    
    
    

 


// router.get("/",  wrapAsync(ListingControl.index));

// new route : to add new property , this is put above show route cause 
// app thinks new is also a id



// Show route

router
    .route("/:id")
    .get( wrapAsync(ListingControl.showList))
    
    .put( isLoggedIn, upload.single("listing[image]"), isOwner, wrapAsync(ListingControl.updateList))
    .delete( isLoggedIn, isOwner, wrapAsync(ListingControl.deleteList));

 



// this helps to Post a new listing in the database

// router.post(
//     "/",
//     isLoggedIn,
//     wrapAsync(ListingControl.createList)
// );

// Edit route , to do changes in the file




// // Update route , to save and update the edited list

// router

// Delete route , this will delete the listing

router.get("/:id/book", isLoggedIn, wrapAsync(ListingControl.getBook));

router.post("/:id/book", isLoggedIn, wrapAsync(ListingControl.postBook));

module.exports = router;
