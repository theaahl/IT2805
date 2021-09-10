// Om listen ikke eksisterer, opprett den.
if (!window.sessionStorage.getItem("shoppingList")) {
  window.sessionStorage.setItem("shoppingList", JSON.stringify({}));
}

/**
 * Henter listen fra sessionStorage så man slipper å skrive kommandoen under så mange ganger.
 * @returns {[]} listen som ligger i sessionStorage.
 */
function hentListe() {
  return JSON.parse(window.sessionStorage.getItem("shoppingList"));
}

/**
 * Denne funksjonen kaller vi for at innholdet på siden skal oppdatere seg. I vårt tilfelle henter den listen, og setter teller-feltet index.html til lengden av listen.
 */
function oppdaterTeller() {
  // Lagrer referansen til telleren
  const teller = document.getElementById("totalt_i_vognen");
  const shoppingList = hentListe();

  let total = 0;
  for (const antall of Object.values(shoppingList)) {
    total = total + antall;
  }

  teller.innerHTML = total;
}

// Oppdaterer teller første gang
setTimeout(() => {
  oppdaterTeller();
}, 1);
