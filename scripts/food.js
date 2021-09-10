// The code is reused form the other file, but we werent able to import the functions due to CORS error.

// if list dosent exist, create the list
if (!window.sessionStorage.getItem("shoppingList")) {
  window.sessionStorage.setItem("shoppingList", JSON.stringify({}));
}
 //list of our food
let food = [
  {
    name: "Food",
    description: "Save the planet and your wallet! Bring your own lunch box and let us know at check out for 1$ discount. We always use ecological produce from our garden.",
    glutenfree: true,
    vegetarian: true,
    sweets: true,
    sandwiches: true,
    imgsrc: "../img/food/lunchboxsmall.png",
    price: "",
  },
  {
    name: "Brownies",
    price: 2.5,
    description:
      " We guarantee this is one of the top three brownies you have ever tasted!",
    glutenfree: true,
    vegetarian: true,
    sweets: true,
    sandwiches: false,
    imgsrc: "../img/food/brownie.jpg",
  },
  {
    name: "Caesar Salad",
    price: 6,
    description:
      "Try our very own Caesar Salad! If you want it vegetarian, let us know and the chicken will be replaced with roasted chickpeas. ",
    glutenfree: false,
    vegetarian: true,
    sweets: false,
    sandwiches: true,
    imgsrc: "../img/food/ceasar_salad.jpg",
  },
  {
    name: "Cinnamon Bun",
    price: 3,
    description:
      "The picture sells itself! One of our most popular goods.",
    glutenfree: false,
    vegetarian: true,
    sweets: true,
    sandwiches: false,
    imgsrc: "../img/food/cinnamon_bun.jpg",
  },
  {
    name: "Club Sandwich",
    price: 6,
    description:
      "This delicious little meal will make you smile when you have the first bite! With a crispy bread and delicious filling, it is our bestseller.",
    glutenfree: false,
    vegetarian: false,
    sweets: false,
    sandwiches: true,
    imgsrc: "../img/food/club_sandwich.jpeg",
  },
  {
    name: "Cookie",
    price: 2,
    description:
      "This cookie contains white chocolate chips and dried cranberry. A very popular choice among our customers. Try it with a cappuccino on the side.",
    glutenfree: false,
    vegetarian: true,
    sweets: true,
    sandwiches: false,
    imgsrc: "../img/food/cookie.jpg",
  },
  {
    name: "Focaccia Caprese",
    price: 5,
    description:
      "Focaccia with homemade mozzarella and pesto accompanied with cherry tomatoes from our own garden.",
    glutenfree: false,
    vegetarian: true,
    sweets: false,
    sandwiches: true,
    imgsrc: "../img/food/foccacia.jpg",
  },
  {
    name: "Tuna Sandwich",
    price: 5,
    description:
      "Our creamy tuna pasta is a recipe that has been in our owners family for generations. Gluten free option is available.",
    glutenfree: true,
    vegetarian: false,
    sweets: false,
    sandwiches: true,
    imgsrc: "../img/food/Tuna_sandwich.jpg",
  },
];


/**
 * this function will import the updated list and save it to sessionStorage
 * @param {[]} nyListe is the updated list.
 */
function oppdaterListe(nyListe) {
  window.sessionStorage.setItem("shoppingList", JSON.stringify(nyListe));
}

/**
 * This is to update the counter to update number at top )next to shopping cart) this is done by getting the list, and set the counter = the lenght of list.
 */
function oppdaterTeller() {
  const teller = document.getElementById("totalt_i_vognen");
  const shoppingList = hentListe();

  let total = 0;
  for (const antall of Object.values(shoppingList)) {
    total = total + antall;
  }

  teller.innerHTML = total;
}

/**
 * Getting list form sessionStorage, to avoid repetitions
 * @returns {[]} the list in sessionStorage.
 */
function hentListe() {
  return JSON.parse(window.sessionStorage.getItem("shoppingList"));
}

/**
 * add the item to shoppingcart 
 * @param {*} vareNavn
 */
function leggTilVare(vareNavn) {
  const liste = hentListe();

  // if the item dosent exist in the shoppinglist (handelkurven) will the value be set to 1. 
  if (!liste[vareNavn]) {
    liste[vareNavn] = 1;
  } else {
    liste[vareNavn]++;
  }

  oppdaterListe(liste);
  oppdaterTeller();
}

const generateFood = (rootElement, food) => {
  //this function creates html-content to our food page
  rootElement.innerHTML = "";

  for (let prod of food) {
    const outerDiv = document.createElement("div");
    outerDiv.className = `${prod.glutenfree ? "gluten-free" : ""} ${prod.veg ? "vegetarian" : ""
      } ${prod.sweet ? "sweets" : "sandwiches-salads"}`;

    const foodItem = document.createElement("div");
    foodItem.className = "foodItem";

    const divText = document.createElement("div");
    divText.className = "divText";

    const name = document.createElement("p");
    name.style = "font-size:28px; font-weight:bold; margin-top:2px"; 
    name.appendChild(document.createTextNode(prod.name));
    name.className = "innerName";
    divText.appendChild(name);

    const description = document.createElement("p");
    description.appendChild(document.createTextNode(prod.description));
    divText.appendChild(description);

    const price = document.createElement("p");
    if (prod.name !== "Food") {
        price.appendChild(document.createTextNode("Price: " + prod.price+'$'));
        price.style = "font-weight: bold; font-size: 20px";
        divText.appendChild(price);
    }
      
    const button = document.createElement("button");
      if (prod.name !== "Food") {
        button.onclick = () => leggTilVare(prod.name);
        button.appendChild(document.createTextNode("Add to cart"));
        divText.appendChild(button);
      }
      
    const image = document.createElement("div");
    image.className = "image";
    image.style = `background-image: url(${prod.imgsrc});`;

    // appending in right order

    

    foodItem.appendChild(divText);
    foodItem.appendChild(image);

    outerDiv.appendChild(foodItem);
      
    if (prod.name === "Food") {
      const descriptionEmpty = document.createElement("p");
      descriptionEmpty.appendChild(document.createTextNode("Sorry, no results matching your preferences.."));
      descriptionEmpty.Id = "descriptionEmpty";
      foodItem.appendChild(descriptionEmpty);
      descriptionEmpty.className = "descriptionEmpty"
      descriptionEmpty.style.visibility = "hidden"
    }

    rootElement.appendChild(outerDiv);
  }
};

setTimeout(() => {
  oppdaterTeller();
}, 1);



const options = {
  sweets: false, 
  sandwiches: false,
  vegetarian: false,
  glutenfree: false,
};

const handleCheckbox = (event) => {
  
  const { target: { name, checked } } = event;

  // checking with console.log
  console.log('Oppdatert: ', name, checked);

  options[name] = checked;

  showResults();
};

const showResults = () => {
  
  const matchingProducts = food.filter(f => {
    if (options.sweets && !f.sweets) {
      return false;
    }
    if (options.sandwiches && !f.sandwiches) {
      return false
    }
    if (options.vegetarian && !f.vegetarian) {
      return false
    }
    if (options.glutenfree && !f.glutenfree) {
      return false
    }
    return true;
  });
 
  const boxes = document.querySelectorAll('.foodItem');
  const textInDiv = document.querySelectorAll('.innerName');
  const noMatch = document.querySelectorAll('.descriptionEmpty');
  for (i of boxes) {
    i.style.display = "None";
  }
  console.log(matchingProducts);
  for (i = 0; i < matchingProducts.length; i++) {
    for (j = 0; j < textInDiv.length; j++) {
      if (matchingProducts[i].name === textInDiv[j].innerHTML) {
        boxes[j].style.display = "block";
        noMatch[0].style.visibility = "hidden";
      }
    }
  }

  if (matchingProducts.length === 1) {
      noMatch[0].style.visibility = "visible";
  }
};


const inputs = document.querySelectorAll('#foodForm label > input');
console.log(inputs);
inputs.forEach(inp => inp.addEventListener('change', handleCheckbox)); 

let formHeight = document.getElementById("foodForm").offsetHeight;

function resize(){
    formHeight = document.getElementById("foodForm").offsetHeight;  //gets height of the form
    let contain =  document.getElementsByClassName("container"); 
    let sideHeight = (formHeight+50)+''; 
    left.style.height = 'auto';     //to reset the size of the left column when function is called
    for(c of contain){
        containerHeight = c.offsetHeight+''; //finds size of conatiner
        c.style.minHeight = sideHeight+'px'; //set the min-size of the form to the size of the form (for checkboxes)
    }
    left = document.getElementById("left"); 
    left.style.height = containerHeight+'px'; //set size of the left colum to the size of the container. 
}

window.addEventListener('resize', resize);  

function leftsize(){ //function for updating the left colums' size every time the page is changed (i.e. foodItems sorted out...)
    let container = document.getElementsByClassName("container");
    let containerHeight;
    let left = document.getElementById("left");
    left.style.height = 'auto';
    for(c of container){
        containerHeight = c.offsetHeight+'';
    }
    left.style.height = containerHeight+'px';
}

window.addEventListener('change', leftsize);
