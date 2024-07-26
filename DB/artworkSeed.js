require("dotenv").config();
const mongoose = require("mongoose");
const Artwork = require("../models/Artwork");

const seedData = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("Connected to the database");

    // Create initial artwork data
    const artwork = new Artwork({
      title: "First Artwork",
      image: "uploads/FirstPieceClayton.jpg",
      description: "This is the first artwork.",
      artistName: "Artist Name",
      comments: [
        {
          text: "Great artwork!",
          artistName: "@gabby1",
        },
      ],
    });

    // Save the artwork to the database
    await artwork.save();
    console.log("Seed data inserted");

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

seedData();
