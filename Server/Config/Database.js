const mongoose = require("mongoose");

const connection = async () => {
    try {
        const connect = await mongoose.connect("mongodb://localhost:27017/");
        console.log("Database connected");
    } catch (e) {
        console.log("DB Error: " + e);
    }
}

module.exports = connection;