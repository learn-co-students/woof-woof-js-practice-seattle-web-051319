document.addEventListener("DOMContentLoaded", function() {	
	getDogs();
})

function getDogs() {
	fetch("http://localhost:3000/pups")
		.then(response => response.json())
		.then(json => displayDogBar(json));
}

function displayDogBar(json) {	
	for (let i = 0; i < json.length; i++) {
		displayDogSpan(json[i]);
	}
}

function displayDogSpan(dog) {
	const dogBar = document.getElementById("dog-bar");
	const dogSpan = document.createElement("span");
	
	dogSpan.textContent = dog.name;
	dogBar.appendChild(dogSpan);
	
	dogSpan.addEventListener("click", () => {
		displayDogData(dog)		
	});
}

function displayDogData(dog) {
	const dogInfo = document.getElementById("dog-info");
	const dogImg = document.createElement("img");
	const dogName = document.createElement("h2");
	const dogButton = document.createElement("button");
	
	while (dogInfo.childElementCount > 0) {
		dogInfo.firstElementChild.remove();
	}

	dogImg.src = dog.image;
	dogName.textContent = dog.name;

	if (dog.isGoodDog) {
		dogButton.textContent = "Good Dog!";
	} else {
		dogButton.textContent = "Bad Dog!";
	}

	dogInfo.appendChild(dogImg);
	dogInfo.appendChild(dogName);
	dogInfo.appendChild(dogButton);
	
	dogButton.addEventListener("click", () => {
		processDogButton(dog);
	});
}

function processDogButton(dog) {
	let status = undefined;
	
	if (dog.isGoodDog) {
		status = false;
	} else {
		status = true;
	}

	const configObj = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({isGoodDog: status})
	}
	
	fetch(`http://localhost:3000/pups/${dog.id}`, configObj)
		.then(response => response.json())
		.then(json => displayDogData(json));
}