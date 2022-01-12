const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose
	.connect("mongodb://localhost:27017/yelp-camp")
	.then(() => console.log("Connected to Mongo"))
	.catch(e => console.log(e));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
	console.log("DataBase Connected");
});

function getRandomPhoto() {
	const random = Math.floor(Math.random() * 5);
	if (random === 0) {
		return "https://images.unsplash.com/photo-1594060026447-83de545e0c22?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80";
	} else if (random === 1) {
		return "https://images.unsplash.com/photo-1603584550196-cefc36c8aaf8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
	} else if (random === 2) {
		return "https://images.unsplash.com/photo-1631451725131-d79ddd78da8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80";
	} else if (random === 3) {
		return "https://images.unsplash.com/photo-1586026167001-91d2fb81f055?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
	} else if (random === 4) {
		return "https://images.unsplash.com/photo-1504388130742-f772e8b51299?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
	}
}

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			image: getRandomPhoto(),
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, at. Tenetur reiciendis eum atque. Sequi vero in libero nesciunt, saepe temporibus sint commodi voluptates magnam odio vel consequatur unde, quos a rerum ullam. Vel quod veniam quisquam, accusantium magnam consectetur, eum, laborum ut velit nostrum esse ea cumque error mollitia?",
			price,
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
