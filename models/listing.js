const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");


const listingSchema = new Schema({
    title: { type: String, required: true },
    description: String,

    image: {
        filename: { type: String, default: "listingimage" },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        },
    },

    price: Number,
    location: String,
    country: String,

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing){
        await Review.deleteMany({_id : {$in : listing.reviews}});

    }
    
})

module.exports = mongoose.model("Listing", listingSchema);