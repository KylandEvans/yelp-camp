const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const catchAsync = require("../Utils/catchAsync");
const ExpressError = require("../Utils/ExpressError");
const { campgroundSchema } = require("../schemas.js");

const validateCampground = (req, res, next) => {
	const { error } = campgroundSchema.validate(req.body);
	if (error) {
		const msg = error.details.map(el => el.message).join(",");
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

router.get(
	"/",
	catchAsync(async (req, res) => {
		const campgrounds = await Campground.find({});
		res.render("campgrounds/index", { campgrounds });
	})
);

router.get(
	"/new",
	catchAsync((req, res) => {
		res.render("campgrounds/new");
	})
);

router.post(
	"/",
	validateCampground,
	catchAsync(async (req, res, next) => {
		const campground = new Campground(req.body.campground);
		await campground.save();
		req.flash("success", "Successfully made a new campground");
		res.redirect(`/campgrounds/${campground._id}`);
	})
);

router.get(
	"/:id",
	catchAsync(async (req, res) => {
		const campground = await Campground.findById(req.params.id).populate(
			"reviews"
		);
		if (!campground) {
			req.flash("error", "Cannot find that campground");
			return res.redirect("/campgrounds");
		}
		res.render("campgrounds/show", { campground });
	})
);

router.get(
	"/:id/edit",
	catchAsync(async (req, res, next) => {
		const { id } = req.params;
		const campground = await Campground.findById(id);
		if (!campground) {
			req.flash("error", "Cannot find that campground");
			return res.redirect("/campgrounds");
		}
		res.render("campgrounds/edit", { campground });
	})
);

router.put(
	"/:id",
	validateCampground,
	catchAsync(async (req, res, next) => {
		const { id } = req.params;
		const campground = await Campground.findByIdAndUpdate(id, {
			...req.body.campground,
		});
		req.flash("success", "Successfully updated campground");
		res.redirect(`/campgrounds/${id}`);
	})
);

router.delete(
	"/:id",
	catchAsync(async (req, res) => {
		const { id } = req.params;
		const campground = await Campground.findByIdAndDelete(id);
		req.flash("success", "You successfully deleted the campground");
		res.redirect("/campgrounds");
	})
);

module.exports = router;