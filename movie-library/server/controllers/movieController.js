const asyncHandler = require('express-async-handler');
const Movie = require('../models/Movie');
const axios = require('axios');

const searchMovies = asyncHandler(async (req, res) => {
  const { query } = req.query;
  const { data } = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${process.env.OMDB_API_KEY}`);
  res.json(data.Search);
});

const addMovieToList = asyncHandler(async (req, res) => {
  const { title, imdbID, listName, isPublic } = req.body;

  const movie = new Movie({
    user: req.user._id,
    title,
    imdbID,
    listName,
    isPublic,
  });

  const createdMovie = await movie.save();
  res.status(201).json(createdMovie);
});

const getUserLists = asyncHandler(async (req, res) => {
  const lists = await Movie.find({ user: req.user._id }).distinct('listName');
  res.json(lists);
});

const getMoviesInList = asyncHandler(async (req, res) => {
  const { listName } = req.params;
  const movies = await Movie.find({ user: req.user._id, listName });
  res.json(movies);
});

const getPublicMoviesInList = asyncHandler(async (req, res) => {
  const { listName } = req.params;
  const movies = await Movie.find({ listName, isPublic: true });
  res.json(movies);
});

module.exports = { searchMovies, addMovieToList, getUserLists, getMoviesInList, getPublicMoviesInList };
