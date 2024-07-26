const express = require("express");
const mongoose = require("mongoose");
const Artwork = require("../models/Artwork");
const router = express.Router();

// GET ALL CRITICS FOR AN ARTWORK
router.get("/artwork/:id/critics", async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) {
      return res.status(404).json({ msg: "Artwork not found" });
    }
    res.json(artwork.critics);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
});

// SHOW ONE critic FOR AN ARTWORK
router.get("/artwork/:artworkId/critics/:criticId", async (req, res) => {
  try {
    const { artworkId, criticId } = req.params;
    const artwork = await Artwork.findById(artworkId).populate("critics");

    if (!artwork) {
      return res.status(404).json({ msg: "Artwork not found" });
    }

    const critic = artwork.critics.id(criticId);
    if (!critic) {
      return res.status(404).json({ msg: "critic not found" });
    }

    res.json(critic);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Something went wrong!" });
  }
});

// CREATE A CRITIC
router.post("/artwork/:id/critics", async (req, res) => {
  try {
    const { text, artistName } = req.body;
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) {
      return res.status(404).json({ msg: "Artwork not found" });
    }

    const newCritic = { text, artistName };
    artwork.critics.push(newCritic);
    await artwork.save();

    res.status(201).json(newCritic);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
});

// UPDATE A critic
router.patch("/artwork/:artworkId/critics/:criticId", async (req, res) => {
  try {
    const { artworkId, criticId } = req.params;
    const { text, artistName } = req.body;

    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      return res.status(404).json({ msg: "Artwork not found" });
    }

    const critic = artwork.critics.id(criticId);
    if (!critic) {
      return res.status(404).json({ msg: "critic not found" });
    }

    if (text) critic.text = text;
    if (artistName) critic.artistName = artistName;
    await artwork.save();

    res.json(critic);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error updating critic" });
  }
});

// DELETE A CRITIC
router.delete("/artwork/:artworkId/critics/:criticId", async (req, res) => {
  try {
    const { artworkId, criticId } = req.params;

    const updatedArtwork = await Artwork.findOneAndUpdate(
      { _id: artworkId, "critics._id": criticId },
      { $pull: { critics: { _id: criticId } } },
      { new: true }
    );

    if (!updatedArtwork) {
      return res.status(404).json({ msg: "critic not found" });
    }

    res.json({ msg: "critic deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error deleting critic" });
  }
});

module.exports = router;
