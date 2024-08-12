const mongoose = require('mongoose');

const movieSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    imdbID: { type: String, required: true },
    listName: { type: String, required: true },
    isPublic: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
