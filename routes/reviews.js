const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../Utils/catchAsync");
const ExpressError = require("../Utils/ExpressError");

const reviews = require("../controllers/reviews");
const {
	validateReview,
	isLoggedIn,
	isReviewAuthor,
} = require("../middleware.js");

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.postNewReview));

router.delete(
	"/:reviewId",
	isLoggedIn,
	isReviewAuthor,
	catchAsync(reviews.deleteReview)
);

module.exports = router;
