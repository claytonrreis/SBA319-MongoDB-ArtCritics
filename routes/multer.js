const express = require("express");
const multer = require("multer");
const path = require("path");

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

// Route to handle file uploads
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.status(200).json({
      message: "File uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload file", error });
  }
});

module.exports = router;
