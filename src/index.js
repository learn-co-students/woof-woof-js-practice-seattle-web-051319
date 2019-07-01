document.addEventListener('DOMContentLoaded', () => {
  const dogBar = document.getElementById('dog-bar')
  const filterBar = document.getElementById('good-dog-filter')
  fetchNonFilteredDogs(dogBar)
  filterBar.addEventListener('click', () => {
    filterSpans(filterBar, dogBar)
  })
})

//This function takes 2 elements because it wants to modify the spans and
//the filter button
function filterSpans(htmlElement1, htmlElement2) {
  if (htmlElement1.textContent === 'Filter good dogs: OFF') {
    htmlElement1.textContent = 'Filter good dogs: ON'
    fetchFilteredDogs(htmlElement2)
  }
  else {
    htmlElement1.textContent = 'Filter good dogs: OFF'
    fetchNonFilteredDogs(htmlElement2)
  }
}

//You have to return the fetch if you want to access the json information
function fetchDogs() {
  return fetch('http://localhost:3000/pups')
  .then(res => res.json())
}

//This and the below function take the json from our fetch and call the
//addDog function accordingly
function fetchFilteredDogs(htmlElement) {
  fetchDogs().then(json => {
    htmlElement.textContent = ''
    for (let dog of json)
    if (dog.isGoodDog) {
      addDog(dog, htmlElement)
    }
  })
}

function fetchNonFilteredDogs(htmlElement) {
  fetchDogs().then(json => {
    htmlElement.textContent = ''
    for (let dog of json)
    addDog(dog, htmlElement)
  })
}

//This function adds a new span and event listener for a dog
function addDog(dog, htmlTag) {
  const dogInfo = document.getElementById('dog-info')
  const span = document.createElement('span')
  span.textContent = dog.name

  span.addEventListener('click', () => {
    displaySingleDog(dog, dogInfo)
  })
  htmlTag.appendChild(span)
}

//This function will display a dog in the dog-info div
function displaySingleDog(dog, htmlElement) {
  htmlElement.textContent = ''
  const img = document.createElement('img')
  const h2 = document.createElement('h2')
  const doggoButton = document.createElement('button')

  img.src = dog.image
  h2.textContent = dog.name
  if (dog.isGoodDog) {
    doggoButton.textContent = 'Good Doggo!'
  }
  else {
    doggoButton.textContent = 'Bad Doggo!'
  }

  doggoButton.addEventListener('click', () => {
    updateDogStatus(dog, htmlElement)
  })

  htmlElement.appendChild(img)
  htmlElement.appendChild(h2)
  htmlElement.appendChild(doggoButton)
}

//This function sends a patch to flip the dog's good/bad status
function updateDogStatus(dog, htmlTag) {
  const filterBar = document.getElementById('good-dog-filter')
  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify({isGoodDog: !dog.isGoodDog})
  })
  .then(res => res.json())
  .then(json => displaySingleDog(json, htmlTag))
}
