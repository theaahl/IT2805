// The code is reused form the other file, but we werent able to import the functions due to CORS error.

// Getting reference to the empty list
const handlevognListe = document.getElementById("handlevognListe");

const totalPrice = document.getElementById("totalPrice");


const PriceList = {
  "Tuna Sandwich": 5,
  "Caesar Salad": 6,
  "Club Sandwich": 6,
  "Focaccia Caprese": 5,
  "Cinnamon Bun": 3,
  "Cookie": 2,
  "Brownies": 2.5,
  "Cappuccino": 2,
  "Macchiato": 4,
  "Latte": 3.5,
  "Chocolate Chip Frappuccino": 5,
  "Hot Chocolate": 3,
  "Iced Tea": 3.5,
  "Tea": 1.5,
  "Coffee Beans": 4.5,
};

/*
 * Getting list form sessionStorage, to avoid repetitions
 * @returns {[]} the list in sessionStorage.
 */
function hentListe() {
  return JSON.parse(window.sessionStorage.getItem("shoppingList"));
}

function visFremHandlevognListe() {
  handlevognListe.innerHTML = "";
  totalPrice.innerHTML = "";

  const liste = hentListe();
  let totalSum = 0;

  // if empty
  if (Object.keys(liste).length === 0) {
    handlevognListe.innerHTML = "Your cart is empty";

  } else {
    // if not empty - loops through all the values.
    for (const [matvare, antall] of Object.entries(liste)) {
      // Her regnes totalsummen ut
      totalSum += PriceList[matvare] * antall;



      // make list item <li>
      const listItem = document.createElement("li");

      
      const tekst = document.createTextNode(`${matvare}: ${antall}`);
        
        
      // the + button 
      const buttonPluss = document.createElement("button");
      buttonPluss.innerHTML = "+";
      buttonPluss.style.float = "right";
      buttonPluss.onclick = function () {
        endreAntall(matvare, 1);
      };

        
      // the - button
      const buttonMinus = document.createElement("button");
      buttonMinus.innerHTML = "-";
      buttonMinus.style.float = "right";
      buttonMinus.onclick = function () {
        endreAntall(matvare, -1);
      };

      let buttons = document.createElement("div");
      // put the element inside of <li>-item.
      listItem.appendChild(tekst);
      buttons.appendChild(buttonPluss);
      buttons.appendChild(buttonMinus);
      listItem.appendChild(buttons);


      //puts the <li>-item inside the list
      handlevognListe.appendChild(listItem);
    }
    disc = 1;
    if (document.getElementById("bringCup").checked && totalSum > 0) {
      totalSum -= disc;
    }
    totalPrice.innerHTML = "Total sum: " + totalSum + "$";
    totalPrice.style.float = "center";
  }
}

function endreAntall(matvare, endring) {
  const liste = hentListe();

  if (endring === -1 && liste[matvare] > 0) {
    liste[matvare]--;
  }

  if (endring === 1) {
    liste[matvare]++;
  }

  window.sessionStorage.setItem("shoppingList", JSON.stringify(liste));
  visFremHandlevognListe();
  oppdaterTeller();
}

// To always show the updated list when accessing the page
visFremHandlevognListe();

/**
 * This is to update the counter to update number at top )next to shopping cart) this is done by getting the list, and set the counter = the lenght of list.
 */
function oppdaterTeller() {
  // reference to counter
  const teller = document.getElementById("totalt_i_vognen");
  const shoppingList = hentListe();

  let total = 0;
  for (const antall of Object.values(shoppingList)) {
    total = total + antall;
  }

  teller.innerHTML = total;
}

function emptyCart() {
  let listenvaar = hentListe();
  if (Object.keys(listenvaar).length > 0) {
    listenvaar = {};
    window.sessionStorage.setItem("shoppingList", JSON.stringify(listenvaar));
    visFremHandlevognListe();
    oppdaterTeller();

    window.confirm("Thank you for your purchase! Your order number is: " + Math.ceil(Math.random() * 100000) + ".\nYou can now pick up your order at the cafe.")
  }


}


//updating the counter at the start
setTimeout(() => {
  oppdaterTeller();
}, 1);
