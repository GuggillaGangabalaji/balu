const express = require('express');
const { searchMovies, addMovieToList, getUserLists, getMoviesInList, getPublicMoviesInList } = require('../controllers/movieController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/search', searchMovies);
router.post('/', protect, addMovieToList);
router.get('/lists', protect, getUserLists);
router.get('/lists/:listName', protect, getMoviesInList);
router.get('/public/lists/:listName', getPublicMoviesInList);

module.exports = router;
