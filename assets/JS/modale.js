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
    <div class="modPage2">
				<span class="modReturn">
					<i class="fa-solid fa-arrow-left"></i>
				</span>
				<span class="closeModale modaleCTA">
					<i class="fa-solid fa-xmark"></i>
				</span>
				<h2 class="modaleTitle">Ajout photo</h2>
				<form id="modPage2_form" class="modPage2_form">
					<span class="modPage2_img">
						<span class="modPage2_icon">
							<i class="fa-regular fa-image"></i>
						</span>
						<label for="addPhoto" class="modPage2_textaddImg">+ Ajouter photo</label>
						<input id="addPhoto" class="modPage2_addImg" type="file" accept="image/jpg, image/png">
						<span class="modPage2_description">jpg, png : 4mo max</span>
					</span>
					<label for="photoTitle" class="modPage2_input">Titre</label>
					<input id="photoTitle" type="text" >
					<label for="photoCategories">Catégorie</label>
					<select id="photoCategories">
						<!-- Catégories ajoutées dynamiquement -->
					</select>
					<span id="errorForm"></span>
					<span class="modalePage2_bar"></span>
					<input id="validateProject" class="modPage2_validCTA" type="submit" value="Valider">
				</form>
</div>
`;

const modale = document.getElementById('modale'); //séléctionne le conteneur dans lequel ce seras inséré "modale" ici

modale.innerHTML = myHTML; //insère le contenu html dans le conteneur


//MODALE 1 OPEN/CLOSE


const modaleContainer = document.querySelector(".modaleContainer");
const openModale = document.querySelectorAll(".openModale");
const closeModale = document.querySelectorAll(".closeModale")
const modPage1 = document.querySelector(".modPage1");
const modPage2 = document.querySelector(".modPage2");

openModale.forEach(open => open.addEventListener("click", displayModale));

function displayModale() {
    modaleContainer.classList.toggle("active"); // Ajoute la class active pour afficher la modale
    modPage1.style.display = "flex"; // Affiche la modale "Galerie photo"
    modPage2.style.display = "none"; //Affiche pas l'autre modale
};

closeModale.forEach(close => close.addEventListener("click", displayNoneModale));

function displayNoneModale() {
    modaleContainer.classList.remove("active"); // Ajoute la class active pour afficher la modale
};

// Evènement pour accéder à la deuxième modale ou revenir à la première modale
    // Sélection du bouton "Ajouter photo"
    const nextModale = document.querySelector(".modalePage1_button");
    // Evènement sur le bouton  "Ajouter photo" au clic
    nextModale.addEventListener("click", openNextModale);
    // Fonction lié au bouton "Ajouter photo"
    function openNextModale() {
        modPage1.style.display = "none"; // Masque modale "Galerie photo"
        modPage2.style.display = "flex"; // Affiche modale "Ajout photo"
    };

    // Sélection de l'icône de retour
    const returnModale = document.querySelector(".modReturn");
    // Evènement au clic sur l'icône
    returnModale.addEventListener("click", returnFirstModale);
    // Fonction liée à l'icône de retour
    function returnFirstModale() {
        modPage1.style.display = "flex"; // Affiche modale "Galerie photo"
        modPage2.style.display = "none"; // Masque modale "Ajout photo"
    };


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