// The code is reused form the other file, but we werent able to import the functions due to CORS error.

// if list dosent exist, create the list
if (!window.sessionStorage.getItem("shoppingList")) {
  window.sessionStorage.setItem("shoppingList", JSON.stringify({}));
}
 //list of our drinks

let drinks = [
 {
    name: "Drinks",
    description: "Save the planet and your wallet! Bring your own cup and let us know at check out for 1$ discount. We always use ecological beans in our coffee.",
    coffee: true,
    tea: true,
    cold: true,
    hot: true,
    imgsrc: "../img/drinks/saveplanetlong.png",
  },
  {
    name: "Cappuccino",
    price: 2,
    description: "A neat little drink with mainly espresso and some milk.",
    coffee: true,
    tea: false,
    cold: false,
    hot: true,
    imgsrc: "../img/drinks/cappuccino.jpg",
  },
  {
    name: "Chocolate Chip Frappuccino",
    price: 5,
    description:
      "This tasteful, refreshingly cold drink is our bestseller refreshment. No need for additional information.",
    coffee: true,
    tea: false,
    cold: true,
    hot: false,
    imgsrc: "../img/drinks/chocolate_chip_frappucino.jpg",
  },
  {
    name: "Hot Chocolate",
    price: 3,
    description:
      "Hot cocoa is known for most people, but this one is in its own range. Try it with whipped cream, you won’t regret it!",
    coffee: false,
    tea: false,
    cold: false,
    hot: true,
    imgsrc: "../img/drinks/kakao.jpg",
  },
  {
    name: "Iced Tea",
    price: 3.5,
    description: "Refreshing iced tea, perfect for a hot summer day.",
    coffee: false,
    tea: true,
    cold: true,
    hot: false,
    imgsrc: "../img/drinks/iced_tea.jpg",
  },
  {
    name: "Latte",
    price: 3.5,
    description:
      "Coffee with milk, you have probably heard of it. Extra good with a double shot of espresso.",
    coffee: true,
    tea: false,
    cold: false,
    hot: true,
    imgsrc: "../img/drinks/latte.jpg",
  },
  {
    name: "Macchiato",
    price: 4,
    description:
      "Not many have heard of this coffee, but is well worth a taste. The name means “layers of milk”. ",
    coffee: true,
    tea: false,
    cold: false,
    hot: true,
    imgsrc: "../img/drinks/macciato2.jpg",
  },
  {
    name: "Tea",
    price: 1.5,
    description: "Choose between rooibos and green tea.",
    coffee: false,
    tea: true,
    cold: false,
    hot: true,
    imgsrc: "../img/drinks/tea.jpeg",
  },
  {
    name: "Coffee Beans",
    price: 7,
    description: "500g organic coffee beans from Ethiopia. ",
    coffee: true,
    tea: false,
    cold: false,
    hot: false,
    imgsrc: "../img/div/coofebeans.jpg",
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
  console.log(teller);
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

const generateDrinks = (rootElement, drinks) => {
  //this function creates html-content to our drink page
  
  rootElement.innerHTML = "";
  for (let prod of drinks) {
    const outerDiv = document.createElement("div");
    outerDiv.className = `${prod.hot ? "hot" : "cold"} ${prod.coffee ? "coffee" : "tea"
      }`;

    const drinkItem = document.createElement("div");
    drinkItem.className = "foodItem";

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
      if (prod.name !== "Drinks") {
        price.appendChild(document.createTextNode("Price: " + prod.price+'$'));
        price.style = "font-weight: bold; font-size: 20px";
        divText.appendChild(price);
    }
      
    const button = document.createElement("button");
      if (prod.name !== "Drinks") {
        button.onclick = () => leggTilVare(prod.name);
        button.appendChild(document.createTextNode("Add to cart"));
        divText.appendChild(button);
      }
    
    const image = document.createElement("div");
    image.className = "image";
    image.style = `background-image: url(${prod.imgsrc});`;

    
    // appending in right order


    drinkItem.appendChild(divText);
    drinkItem.appendChild(image);

    outerDiv.appendChild(drinkItem);
      
    if (prod.name === "Drinks") {
      const descriptionEmpty = document.createElement("p");
      descriptionEmpty.appendChild(document.createTextNode("Sorry, no results matching your preferences.."));
      descriptionEmpty.Id = "descriptionEmpty";
      drinkItem.appendChild(descriptionEmpty);
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
  hot: false, 
  cold: false,
  tea: false,
  coffee: false,
};

const handleCheckbox = (event) => {
  
  const { target: { name, checked } } = event;

  // checking with console.log
  console.log('Oppdatert: ', name, checked);

  options[name] = checked;

 
  showResults();
};

const showResults = () => {
  
  const matchingProducts = drinks.filter(f => {
    if (options.hot && !f.hot) {
      return false;
    }
    if (options.cold && !f.cold) {
      return false
    }
    if (options.tea && !f.tea) {
      return false
    }
    if (options.coffee && !f.coffee) {
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



const inputs = document.querySelectorAll('#drinkForm label > input');
console.log(inputs);
inputs.forEach(inp => inp.addEventListener('change', handleCheckbox)); 

let formHeight = document.getElementById("drinkForm").offsetHeight;

function resize(){
    formHeight = document.getElementById("drinkForm").offsetHeight;
    let contain =  document.getElementsByClassName("container");
    let sideHeight = (formHeight+50)+'';
    left.style.height = 'auto';
    for(c of contain){
        containerHeight = c.offsetHeight+'';
        c.style.minHeight = sideHeight+'px';
    }
    left = document.getElementById("left");
    left.style.height = containerHeight+'px';
}

window.addEventListener('resize', resize);

function leftsize(){
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
