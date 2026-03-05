require("dotenv").config();

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/AirBnb";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected DB:", mongoose.connection.db.databaseName);
}

const initDB = async () => {
    await Listing.deleteMany({});

    const listings = initData.data.map((obj) => ({
        ...obj,
        owner: "69a895e9c479681e48ae78e6"
    }));

    await Listing.insertMany(listings);

    console.log("Database initialized with", listings.length, "listings");
};

main()
.then(async () => {
    await initDB();
    mongoose.connection.close();
})
.catch((err) => console.log(err));