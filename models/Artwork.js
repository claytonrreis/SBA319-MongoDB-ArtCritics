const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  artistName: {
    type: String,
    required: true,
  },
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      artistName: {
        type: String,
        required: true,
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Artwork = mongoose.model("Artwork", artworkSchema);

module.exports = Artwork;

// module.exports = mongoose.model("Artwork", artworkSchema);
