const express = require("express");
const connectDB = require("./DB/connectDB");
const ejs = require("ejs");
const path = require("path");
require("dotenv").config();
const multerRoute = require("./routes/multer");
const Artist = require("./models/Artists");
const starterArtists = require("./DB/ArtistsSeed");
const artistRoute = require("./routes/artists");
const Artwork = require("./models/Artwork");
const artworkRoute = require("./routes/artworks");
const criticsRoute = require("./routes/critics");

connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, "uploads")));

//MIDDLEWARE FUNCTIONS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Use the multer route
app.use("/api/multer", multerRoute);
app.use("/api/artist", artistRoute);
app.use("/api/artwork", artworkRoute);
app.use("/api", criticsRoute);

app.get("/", async (req, res) => {
  try {
    const artworks = await Artwork.find();
    res.render("index", { artworks });
  } catch (error) {
    console.error("Error fetching artworks:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/artist/artistsSeed", async (req, res) => {
  try {
    await Artist.deleteMany({});
    await Artist.create(starterArtists);
    res.json(starterArtists);
  } catch (error) {
    console.log(`Something went Wrong loading seed data ${error.message}`);
  }
});

app.get("/artwork/artworkSeed", async (req, res) => {
  try {
    await Artwork.deleteMany({});
    await Artwork.create(starterArtists);
    res.json(starterArtists);
  } catch (error) {
    console.log(`Something went Wrong loading seed data ${error.message}`);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Server runnning on port: ${PORT}`);
});
