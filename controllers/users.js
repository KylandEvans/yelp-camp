const User = require("../models/user");

module.exports.getRegistrationForm = (req, res) => {
	res.render("users/register");
};

module.exports.createNewUser = async (req, res) => {
	try {
		const { email, username, password } = req.body;
		const user = new User({ email, username });
		const registeredUser = await User.register(user, password);
		req.login(user, err => {
			if (err) return next(err);
			req.flash("success", "Welcome to Yelp-Camp!");
			return res.redirect("/campgrounds");
		});
	} catch (e) {
		req.flash("error", e.message);
		res.redirect("register");
	}
};

module.exports.getLoginForm = (req, res) => {
	if (req.user) {
		return res.redirect("/campgrounds");
	}
	res.render("users/login");
};

module.exports.login = (req, res) => {
	req.flash("success", "Welcome Back!");
	const redirectUrl = req.session.returnTo || "/campgrounds";
	delete req.session.returnTo;
	res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
	req.logOut();
	req.flash("success", "Goodbye!");
	res.redirect("/campgrounds");
};
