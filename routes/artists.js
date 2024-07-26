// const express = require("express");
// const Artist = require("../models/Artists");
// const router = express.Router();

// //ARTISTS ROUTE
// //ARTIST - GET - SHOW ALL artist
// router.get("/", async (req, res) => {
//   try {
//     const artists = await Artist.find({});
//     res.json(artists);
//   } catch (error) {
//     res.status(500).json({ msg: "Something went wrong!" });
//     console.error(error.message);
//   }
// });

// //SHOW - GET - SHOW ONE ARTIST
// router.get("/:id", async (req, res, next) => {
//   try {
//     const oneArtist = await Artist.findById(req.params.id);
//     res.json(oneArtist);
//   } catch (error) {
//     res.status(500).json({ msg: "Something went wrong!" });
//     console.error(error.message);
//   }
//   next();
// });

// //CREATE - POST - CREATE A ARTIST
// router.post("/", async (req, res, next) => {
//   if (!req.body.name && req.body.artistName && req.body.email) {
//     return res.status(400).json({
//       msg: "Please provide all required field: name, artistName, email",
//     });
//   }
//   try {
//     const existingArtist = await Artist.findOne({
//       artistName: req.body.artistName,
//     });
//     if (existingArtist) {
//       return res.status(409).json({ msg: "Artist name already taken!" });
//     }

//     const newArtist = new Artist(req.body);
//     const savedArtist = await newArtist.save();
//     res.status(201).json(savedArtist);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Error creating Artist!" });
//   }
//   next();
// });

// //UPDATE -  PATCH  - UPDATE ARTIST (id)
// router.patch("/:id", async (req, res, next) => {
//   try {
//     const updateArtist = await Artist.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true } // Bring the updated Artist/user(object) when is set to true
//     );
//     if (!updateArtist) {
//       return res.status(404).json({ msg: "Artist not found" });
//     }
//     res.json(updateArtist);
//     console.log(updateArtist);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Error Updating Artist" });
//   }
//   next();
// });

// //DELETE -  DELETE - DELETE ARTIST(id)
// router.delete("/:id", async (req, res, next) => {
//   try {
//     const deletedArtist = await Artist.findByIdAndDelete(req.params.id);
//     if (!deletedArtist) {
//       return res.status(404).json({ msg: "Artist not found" });
//     }
//     res.json({ msg: "Artist deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Error deleting Artist" });
//   }
//   next();
// });

// module.exports = router;

const express = require("express");
const Artist = require("../models/Artists");
const router = express.Router();

// GET ALL ARTISTS
router.get("/", async (req, res) => {
  try {
    const artists = await Artist.find({});
    res.json(artists);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Something went wrong!" });
  }
});

// SHOW ONE ARTIST
router.get("/:id", async (req, res) => {
  try {
    const oneArtist = await Artist.findById(req.params.id);
    if (!oneArtist) {
      return res.status(404).json({ msg: "Artist not found" });
    }
    res.json(oneArtist);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Something went wrong!" });
  }
});

// CREATE A NEW ARTIST
router.post("/", async (req, res) => {
  const { name, artistName, email } = req.body;

  if (!name || !artistName || !email) {
    return res.status(400).json({
      msg: "Please provide all required fields: name, artistName, email",
    });
  }

  try {
    const existingArtist = await Artist.findOne({ artistName });
    if (existingArtist) {
      return res.status(409).json({ msg: "Artist name already taken!" });
    }

    const newArtist = new Artist(req.body);
    const savedArtist = await newArtist.save();
    res.status(201).json(savedArtist);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error creating artist!" });
  }
});

// UPDATE ARTIST
router.patch("/:id", async (req, res) => {
  try {
    const updateArtist = await Artist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated artist
    );
    if (!updateArtist) {
      return res.status(404).json({ msg: "Artist not found" });
    }
    res.json(updateArtist);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error updating artist" });
  }
});

// DELETE ARTIST
router.delete("/:id", async (req, res) => {
  try {
    const deletedArtist = await Artist.findByIdAndDelete(req.params.id);
    if (!deletedArtist) {
      return res.status(404).json({ msg: "Artist not found" });
    }
    res.json({ msg: "Artist deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error deleting artist" });
  }
});

module.exports = router;
