const URL = "http://localhost:3000/pups"



document.addEventListener("DOMContentLoaded", () => {
    main();
})



function main(){
    getPups();
}

function filterGoodPups(json){
    let filteredGood = json.filter(pup => pup.isGoodDog === true)
    renderPups(filteredGood)
}

function getPups(){
    fetch(URL)
    .then(resp => resp.json())
    .then(json => {
        const dogBar = document.getElementById("dog-bar");
        dogBar.textContent = "";
        renderPups(json);
    })
}

function renderPups(object){
    object.forEach(pup => {
        createPup(pup);
    });
}

function createPup(pup){
    const dogBar = document.getElementById("dog-bar");
    let pupSpan = document.createElement("span");
    pupSpan.textContent = pup.name;

    dogBar.appendChild(pupSpan);

    pupSpan.addEventListener("click", () => {
        showPup(pup)    
    })
}

function showPup(pup){
    let dogInfo = document.getElementById("dog-info");
        dogInfo.textContent = "";

        // let pupBox = document.createElement("div");

        let h2 = document.createElement("h2");
        h2.textContent = pup.name;

        let img = document.createElement("img");
        img.src = pup.image;

        let button = document.createElement("button");
        if (pup.isGoodDog === true){
            button.textContent = "Good Dog!"
        } else {
            button.textContent = "Bad Dog!"
        }
        
        button.addEventListener("click", () => {
            console.log("fired post request")
            fetch(`${URL}/${pup.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accepts": "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: !pup.isGoodDog
                })
            })
            .then(resp => resp.json())
            .then(json => showPup(json))
        })


        dogInfo.appendChild(h2);
        dogInfo.appendChild(img);
        dogInfo.appendChild(button);
}




