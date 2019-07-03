const URL = "http://localhost:3000/pups";
const dogBar = document.getElementById('dog-bar');
const dogInfo = document.getElementById('dog-info');
const dogImg = document.createElement('img');
const dogHeader = document.createElement('h2');
const dogButton = document.createElement('button');

function fetchDogs(){
  fetch(URL)
  .then(resp => resp.json())
  .then(json => displayDogs(json))
}

function displayDogs(dogs){
  dogs.forEach(dog => {
    let dogName = document.createElement("span");
    dogName.textContent = dog.name;
    dogBar.appendChild(dogName);
    dogName.addEventListener('click', () => {
      showDog(dog)
    })
    // console.log(dogName)
  })
}


function showDog(dog){
  while(dogInfo.firstChild){
    dogInfo.removeChild(dogInfo.firstChild);
  }
  dogImg.src = dog.image;
  dogInfo.appendChild(dogImg);

  dogHeader.textContent = dog.name;
  dogInfo.appendChild(dogHeader);

  dogButton.textContent = dog.isGoodDog ? "Good Dog" : "Bad Dog";
  dogButton.addEventListener('click', () =>{
    if (dog.isGoodDog){
      dog.isGoodDog = false;
    }else{
      dog.isGoodDog = true;
    }
    toggle(dog);
    // console.log(dogButton)
  })
  dogInfo.appendChild(dogButton)

}

function toggle(dog){
  fetch(`${URL}/${dog.id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": 'application/json',
      "Accepts": 'application/json'
    },
    body: JSON.stringify({
      isGoodDog: dog.isGoodDog
    })
  })
  .then(resp => resp.json())
  .then(obj => {
    const button = document.querySelector("#dog-info button")
    if(obj.isGoodDog){
      button.textContent = "Good Dog!";
    }else{
      button.textContent = "Bad God!";
    }
  })
}






fetchDogs()
