// const express = require("express");
// const Artwork = require("../models/Artwork");
// const router = express.Router();

// //GET ALL ARTWORKS
// router.get("/", async (req, res, next) => {
//   try {
//     const artworks = await Artwork.find();
//     res.json(artworks);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
//   next();
// });

// //SHOW - GET - SHOW ONE ARTWORK
// router.get("/:id", async (req, res, next) => {
//   try {
//     const oneArtwork = await Artwork.findById(req.params.id);
//     res.json(oneArtwork);
//     console.log(oneArtwork);
//   } catch (error) {
//     res.status(500).json({ msg: "Something went wrong!" });
//     console.error(error.message);
//   }
//   next();
// });

// //CREATE - POST - CREATE A ARTIST
// router.post("/", async (req, res, next) => {
//   if (!req.body.title && req.body.image && req.body.artistName) {
//     return res.status(400).json({
//       msg: "Please provide all required field: Title, image, artistName",
//     });
//   }
//   try {
//     const newArtwork = new Artwork(req.body);
//     const savedArtwork = await newArtwork.save();
//     res.status(201).json(savedArtwork);
//     console.log(savedArtwork);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Error creating Artwork!" });
//   }
//   next();
// });

// //UPDATE -  PATCH  - UPDATE ARTIST (id)
// router.patch("/:id", async (req, res, next) => {
//   try {
//     const updateArtwork = await Artwork.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true } // Bring the updated Artwork(object) when is set to true reminder for future projects
//     );
//     if (!updateArtwork) {
//       return res.status(404).json({ msg: "Artwork not found" });
//     }
//     res.json(updateArtwork);
//     console.log(updateArtwork);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Error Updating Artwork" });
//   }
//   next();
// });

// //DELETE -  DELETE - DELETE ARTIST(id)
// router.delete("/:id", async (req, res, next) => {
//   try {
//     const deletedArtwork = await Artwork.findByIdAndDelete(req.params.id);
//     if (!deletedArtwork) {
//       return res.status(404).json({ msg: "Artwork not found" });
//     }
//     res.json({ msg: "Artwork deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Error deleting Artwork" });
//   }
//   next();
// });

// module.exports = router;

const express = require("express");
const Artwork = require("../models/Artwork");
const router = express.Router();

// GET ALL ARTWORKS
router.get("/", async (req, res) => {
  try {
    const artworks = await Artwork.find();
    res.json(artworks);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
});

// SHOW ONE ARTWORK
router.get("/:id", async (req, res) => {
  try {
    const oneArtwork = await Artwork.findById(req.params.id);
    if (!oneArtwork) {
      return res.status(404).json({ msg: "Artwork not found" });
    }
    res.json(oneArtwork);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Something went wrong!" });
  }
});

// CREATE A NEW ARTWORK
router.post("/", async (req, res) => {
  const { title, image, artistName } = req.body;

  if (!title || !image || !artistName) {
    return res.status(400).json({
      msg: "Please provide all required fields: title, image, artistName",
    });
  }

  try {
    const newArtwork = new Artwork(req.body);
    const savedArtwork = await newArtwork.save();
    res.status(201).json(savedArtwork);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error creating artwork!" });
  }
});

// UPDATE ARTWORK
router.patch("/:id", async (req, res) => {
  try {
    const updateArtwork = await Artwork.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated Artwork
    );
    if (!updateArtwork) {
      return res.status(404).json({ msg: "Artwork not found" });
    }
    res.json(updateArtwork);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error updating artwork" });
  }
});

// DELETE ARTWORK
router.delete("/:id", async (req, res) => {
  try {
    const deletedArtwork = await Artwork.findByIdAndDelete(req.params.id);
    if (!deletedArtwork) {
      return res.status(404).json({ msg: "Artwork not found" });
    }
    res.json({ msg: "Artwork deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error deleting artwork" });
  }
});

module.exports = router;
