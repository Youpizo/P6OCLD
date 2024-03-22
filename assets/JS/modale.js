//MODALE 1 INTEGRATION HTML

const myHTML = `
<div class="overlay modaleCTA"></div>
	<div class="modPage1">
		<span class="closeModale modaleCTA">
			<i class="fa-solid fa-xmark"></i>
		</span>
		<h2 class="modaleTitle">Galerie photo</h2>
		<div class="modalePage1_gallery">
	    </div>
		<div class="modalePage1_bar"></div>
		<button class="modalePage1_button">Ajouter une photo</button>
</div>
`;

const modale = document.getElementById('modale'); //séléctionne le conteneur dans lequel ce seras inséré "modale" ici

modale.innerHTML = myHTML; //insère le contenu html dans le conteneur


//MODALE 1 OPEN/CLOSE


const modaleContainer = document.querySelector(".modaleContainer");
const openModale = document.querySelectorAll(".openModale");
const closeModale = document.querySelectorAll(".closeModale")
const modPage1 = document.querySelector(".modPage1");
//////////MODALE 2 ICI ////////////////

openModale.forEach(open => open.addEventListener("click", displayModale));

function displayModale() {
    modaleContainer.classList.toggle("active"); // Ajoute la class active pour afficher la modale
    modPage1.style.display = "flex"; // Affiche la modale "Galerie photo"
    //MODALE 2  ICI///
};

closeModale.forEach(close => close.addEventListener("click", displayNoneModale));

function displayNoneModale() {
    modaleContainer.classList.remove("active"); // Ajoute la class active pour afficher la modale
};
