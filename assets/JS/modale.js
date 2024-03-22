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

/// ACCESSIBILITE MODALE 2 ///


//RECUP DES PHOTOS POUR LA MODALE//
async function getWorksModale() {
    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(dataWorksModale => {

        // Sélection de la div qui va contenir les données récupérées via l'API
        const galleryModale = document.querySelector(".modalePage1_gallery"); 
        galleryModale.innerHTML = "";

        // Création des travaux via les données récupérées
        dataWorksModale.forEach((workModale) => {

        // Création des éléments nécessaires
        const cardModale = document.createElement("figure");
        const imgCardModale = document.createElement("img");
        const titleCardModale = document.createElement("figcaption");

        // On récupère les données importantes pour afficher les travaux
        cardModale.setAttribute('id', workModale.id)
        imgCardModale.src = workModale.imageUrl;            
        imgCardModale.alt = workModale.title;
        imgCardModale.setAttribute('category', workModale.categoryId);
        
        // Ajout de l'icône de suppression d'un projet
        const deleteButton = document.createElement('button');
        deleteButton.type = "submit";
        deleteButton.id= "delete"
        deleteButton.classList.add('deleteButton');
        deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        


        // On relie les éléments img et title à leur parent card
        cardModale.appendChild(imgCardModale);
        cardModale.appendChild(titleCardModale);
        cardModale.appendChild(deleteButton);
        // On relie la card à la balise div qui contient la galerie
        galleryModale.appendChild(cardModale);




})})}