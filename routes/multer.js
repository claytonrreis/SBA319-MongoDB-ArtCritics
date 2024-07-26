// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const Artwork = require("../models/Artwork");

// //MULTER CONFIG
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// //ROUTE FOR FILES UPLOAD
// router.post("/upload", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send("No file uploaded");
//     }

//     const { title, description, artistName } = req.body;
//     const artwork = new Artwork({
//       title,
//       image: req.file.path,
//       description,
//       artistName,
//     });
//     await artwork.save();
//     res.send(`File upload successfully: ${req.file.filename}`);
//   } catch (error) {
//     res.status(500).send("Server error");
//   }
// });

// module.exports = router;

const express = require("express");
const multer = require("multer");
const path = require("path");

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

// Route to handle file uploads
router.post("/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json({
      message: "File uploaded successfully",
      file: req.file,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload file", error });
  }
});

module.exports = router;
