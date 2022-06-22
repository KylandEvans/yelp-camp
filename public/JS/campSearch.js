const searchBox = document.querySelector(".search");
const clearSearchBox = document.querySelector(".btn-clear");
const allCamps = document.querySelectorAll(".campground-container");

searchBox.addEventListener("input", () => {
	const allCampTitles = document.querySelectorAll(".camp-title");
	const allCampLocations = document.querySelectorAll(".camp-location");
	let searchVal = searchBox.value;
	allCampTitles.forEach((title, i) => {
		if (
			!allCampTitles[i].innerHTML.toLowerCase().includes(searchVal.toLowerCase()) &&
			!allCampLocations[i].innerHTML.toLowerCase().includes(searchVal.toLowerCase())
		) {
			allCamps[i].classList.add("animate__fadeOutUp");
			allCamps[i].classList.remove("animate__fadeInDown");
			allCamps[i].classList.add("d-none");
		} else {
			allCamps[i].classList.remove("animate__fadeOutUp");
			allCamps[i].classList.add("animate__fadeInDown");
			allCamps[i].classList.remove("d-none");
		}
	});
});

clearSearchBox.addEventListener("click", () => {
	allCamps.forEach(camp => {
		camp.classList.add("animate__fadeInDown");
		camp.classList.remove("animate__fadeOutUp");
		camp.classList.remove("d-none");
		searchBox.value = null;
	});
});
