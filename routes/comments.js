const express = require("express");
const mongoose = require("mongoose");
const Artwork = require("../models/Artwork");
const router = express.Router();

// GET ALL COMMENTS FOR AN ARTWORK
router.get("/artwork/:id/comments", async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) {
      return res.status(404).json({ msg: "Artwork not found" });
    }
    res.json(artwork.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
});

// SHOW ONE COMMENT FOR AN ARTWORK
router.get("/artwork/:artworkId/comments/:commentId", async (req, res) => {
  try {
    const { artworkId, commentId } = req.params;
    const artwork = await Artwork.findById(artworkId).populate("comments");

    if (!artwork) {
      return res.status(404).json({ msg: "Artwork not found" });
    }

    const comment = artwork.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    res.json(comment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Something went wrong!" });
  }
});

// CREATE A COMMENT
router.post("/artwork/:id/comments", async (req, res) => {
  try {
    const { text, artistName } = req.body;
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) {
      return res.status(404).json({ msg: "Artwork not found" });
    }

    const newComment = { text, artistName };
    artwork.comments.push(newComment);
    await artwork.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
});

// UPDATE A COMMENT
router.patch("/artwork/:artworkId/comments/:commentId", async (req, res) => {
  try {
    const { artworkId, commentId } = req.params;
    const { text, artistName } = req.body;

    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      return res.status(404).json({ msg: "Artwork not found" });
    }

    const comment = artwork.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    if (text) comment.text = text;
    if (artistName) comment.artistName = artistName;
    await artwork.save();

    res.json(comment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error updating comment" });
  }
});

// DELETE A COMMENT
router.delete("/artwork/:artworkId/comments/:commentId", async (req, res) => {
  try {
    const { artworkId, commentId } = req.params;

    const updatedArtwork = await Artwork.findOneAndUpdate(
      { _id: artworkId, "comments._id": commentId },
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    if (!updatedArtwork) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    res.json({ msg: "Comment deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error deleting comment" });
  }
});

module.exports = router;
