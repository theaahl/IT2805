const generateHeader = () => {

    const divHeader = document.getElementById("divHeader");


    if (divHeader != undefined) {
        divHeader.innerHTML = `
		  <div id="navbar">
            <div class="logo">
                <a href="homepage.html"><img src= "../img/logo/Logogronn.png" alt="logo" width="100" style="border-radius: 50%"/></a>
            </div>
            <nav>
                <ul>
                <li><a href="food.html">Food</a></li>
                <li><a href="drinks.html">Drinks</a></li>
                <li><a href="about_us.html">About us</a></li>
                <li><a href="cart.html"><i class="fa fa-shopping-cart" aria-hidden="true"></i></a></li><li id="totalt_i_vognen" style="background-color: white; border-radius: 100px; padding: 3px;">0</li> 
                </ul>
            </nav>
        </div>
	`;
    }
};
const generateFooter = () => {
    const divFooter = document.getElementById("divFooter");
    divFooter.innerHTML = `
		  <footer>
            <div class="row"> 
                <div class="column"><i style="font-size:24px" class="fa fa-map"></i> <br>
                 <a href="https://www.google.com/maps/search/ntnu+trondheim/@63.4124901,10.3609751,13z/data=!3m1!4b1" title="Go to Google Maps" target="_blank">We are located in:<br>Neverland street 1, 0001 Neverland</a> <br>
                    </div>
                <div class="column"><i style="font-size:24px" class="fa fa-paper-plane"></i> <br>
                    <a href="mailto:coffeecorner@corner.com" title="Send us an e-mail">Email: <br>coffeecorner@corner.com</a></div>
                <div class="column"><i style="font-size:24px" class="fab fa-instagram-square"></i> <a href="https://www.instagram.com/ingunnlf/" title="Visit our Instagram" target="_blank">@coffeeCorner</a> <br> <br>
                <i style="font-size:24px" class="fab fa-facebook-square"></i> <a href="https://www.facebook.com/" target="_blank" title="Visit our Facebook">CoffeeCorner</a> </div>
                 </div>
        </footer>
	`;
};

generateHeader();
generateFooter();

