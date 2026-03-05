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
        req.flash("errors", "Listing not avaiable")
        return res.status(404).send("Listing not found");
    }

    res.render("lists/show", { listing });

}


module.exports.createList=async (req, res) => {

    console.log(req.body);
        
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; 
    await newListing.save();
    req.flash("success", "New listing created");

    res.redirect("/listings");

       
}


module.exports.editList = async (req, res) => {

    const { id } = req.params;
  
    const listing = await Listing.findById(id);
  
    if(!listing){
      req.flash("errors","Listing not found");
      return res.redirect("/listings");
    }
  
    res.render("lists/edit",{ listing });
  
}

module.exports.updateList = async (req, res) => {

    let { id } = req.params;

    await Listing.findByIdAndUpdate(id, req.body.listing);

    req.flash("updated", "Listing finally updated");

    res.redirect(`/listings/${id}`);
}

module.exports.deleteList = async(req, res) => {
    let { id } = req.params;
    req.flash("deleted", "Listing finally Deleted");
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}