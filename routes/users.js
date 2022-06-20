const express = require("express");
const router = express.Router();
const catchAsync = require("../Utils/catchAsync");
const users = require("../controllers/users");
const passport = require("passport");

router
	.route("/register")
	.get(users.getRegistrationForm)
	.post(catchAsync(users.createNewUser));

router
	.route("/login")
	.get(users.getLoginForm)
	.post(
		passport.authenticate("local", {
			failureFlash: true,
			failureRedirect: "/login",
		}),
		users.login
	);

router.get("/logout", users.logout);

module.exports = router;
