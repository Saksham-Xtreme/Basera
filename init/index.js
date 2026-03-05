const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/AirBnb";

main()
    .then(() => {
        console.log("Connected to DB");
    })

    .catch((err) => {
        console.log(err);
    });



async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to init");

   
}

const initDB = async() => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=> ({...obj, owner: "69a895e9c479681e48ae78e6" })); 
    await Listing.insertMany(initData.data);
    console.log("Data initialized");

};

initDB();

