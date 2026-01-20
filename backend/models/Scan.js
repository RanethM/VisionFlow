const mongoose = require("mongoose");

const ScanSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },

  detectedObjects: [
    {
      name: String,
      score: Number
    }
  ],

  detectedText: {
    type: String
  },

  bestGuess: {
    type: String
  },

  correctedLabel: {
    type: String,
    default: null
  },

  points: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }, 
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User" // future-proof
  }
});

module.exports = mongoose.model("Scan", ScanSchema);
