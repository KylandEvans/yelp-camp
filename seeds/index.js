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

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 200; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: "621d951f31be4e9f0a6b0b35",
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, at. Tenetur reiciendis eum atque. Sequi vero in libero nesciunt, saepe temporibus sint commodi voluptates magnam odio vel consequatur unde, quos a rerum ullam. Vel quod veniam quisquam, accusantium magnam consectetur, eum, laborum ut velit nostrum esse ea cumque error mollitia?",
			price,
			geometry: {
				type: "Point",
				coordinates: [cities[random1000].longitude, cities[random1000].latitude],
			},
			images: [
				{
					url: "https://res.cloudinary.com/dynljtael/image/upload/v1655776266/YelpCamp/seeds/ricardo-gomez-angel-4hhP-Ud4e84-unsplash_uy6oeo.jpg",
					filename: "YelpCamp/seeds/ricardo-gomez-angel-4hhP-Ud4e84-unsplash_uy6oeo",
				},
				{
					url: "https://res.cloudinary.com/dynljtael/image/upload/v1655776265/YelpCamp/seeds/rohan-makhecha-SqE0zjaYuFI-unsplash_shksgz.jpg",
					filename: "YelpCamp/seeds/rohan-makhecha-SqE0zjaYuFI-unsplash_shksgz",
				},
				{
					url: "https://res.cloudinary.com/dynljtael/image/upload/v1655776263/YelpCamp/seeds/christopher-burns-naDLKYn2eMs-unsplash_dmjrwe.jpg",
					filename: "YelpCamp/seeds/christopher-burns-naDLKYn2eMs-unsplash_dmjrwe",
				},
				{
					url: "https://res.cloudinary.com/dynljtael/image/upload/v1655776262/YelpCamp/seeds/henry-desro-wUFU09WYaHA-unsplash_zvfzlm.jpg",
					filename: "YelpCamp/seeds/henry-desro-wUFU09WYaHA-unsplash_zvfzlm",
				},
			],
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
