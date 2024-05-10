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

        // Evènement au clic pour supprimer un projet
        deleteButton.addEventListener("click", async (event) => {
            event.preventDefault();
            if (confirm("Voulez-vous supprimer le projet ?")) {
                const id = cardModale.id;
                /* Test de récupération de l'id du projet
                console.log(id);
                */
                const monToken = localStorage.getItem("token");
                // Envoi de la demande à l'API pour supprimer le projet
                try {
                    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${monToken}`,
                    }
                });
                // Si la réponse est ok, on recharge les galeries
                if (response.ok) {
                    getWorks();
                    getWorksModale();
                } else {
                    // Sinon on alerte l'utilisateur d'une erreur 
                    alert("Echec de la suppresion du projet")
                }
                } catch (error) {
                    console.log("Une erreur est survenue", error);
                };
            } else {
                alert("La suppression à été annulé");
            };
        });


        // On relie les éléments img et title à leur parent card
        cardModale.appendChild(imgCardModale);
        cardModale.appendChild(titleCardModale);
        cardModale.appendChild(deleteButton);
        // On relie la card à la balise div qui contient la galerie
        galleryModale.appendChild(cardModale);

})})}


// Formulaire d'envoi d'un nouveau projet
    // Eléments requis pour valider l'ajout d'un projet
    const formModale = document.getElementById("modPage2_form");
    const inputImage = document.getElementById("addPhoto");
    const titleProject = document.getElementById("photoTitle");
    const categoryProject = document.getElementById("photoCategories");
    const validateProject = document.getElementById("validateProject");

    // Message d'erreur
    let errorForm = document.getElementById("errorForm");

    // Prévisualisation d'une photo
    inputImage.addEventListener("change", previewPicture);

    function previewPicture(event) {
        event.preventDefault();

        // Utilisation de l'objet FileReader pour lire l'image
        const reader = new FileReader();
        reader.readAsDataURL(inputImage.files[0]);

        // Listener de chargement sur la lecture de l'image
        reader.addEventListener("load", () => {
            previewImage.src = reader.result;
        });
        
        // Affichage de l'image 
        const pictureContainer = document.querySelector(".modPage2_img");
        const previewImage = document.createElement("img");
        // On ajoute un id pour pouvoir la supprimer lors du reset du formulaire
        previewImage.setAttribute("id", "previewImage");
        // On relie l'image au parent Containeur
        pictureContainer.appendChild(previewImage);
        // On lui donne les dimensions pour l'affichage
        previewImage.style.width = "140px";
        previewImage.style.height = "183px";

        // On cache le label qui dépasse lors de prévisualisation de la photo
        const labelPicture = document.querySelector(".modPage2_textaddImg");
        labelPicture.style.opacity = "0";
    };
        
    // Reset formulaire
    function resetForm() {
        document.getElementById("modPage2_form").reset();

        // Suppresion de la prévisualisation de la photo du projet après validation formulaire
        const pictureContainer = document.querySelector(".modPage2_img");
        const previewImage = document.getElementById("previewImage");
        if (previewImage) {
            pictureContainer.removeChild(previewImage);
        };

        // On affiche de nouveau le label
        const labelPicture = document.querySelector(".modPage2_textaddImg");
        labelPicture.style.opacity = "1";
    };

    // Ajout des catégories au formulaire d'ajout de projet 
    fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(dataCategories => {
            // On récupère le select pour ajouter les catégories
            const select = document.getElementById("photoCategories");
            // Catégorie vide pour le visuel
            const emptyOption = document.createElement('option');
            select.appendChild(emptyOption);
            // Récupération dynamique des catégories présentes sur API
            dataCategories.forEach((category) => {
                const option = document.createElement('option');
                option.innerText = category.name;
                option.value = category.id;
                select.appendChild(option);
            });
        });

    // Listeners sur les infos à soumettre pour que le bouton "Valider" passe au vert
    inputImage.addEventListener("input", verifForm);
    titleProject.addEventListener("input", verifForm);
    categoryProject.addEventListener("input", verifForm);
    
    // Fonction de vérification si les conditions sont remplies = bouton "Valider" passe au vert
    function verifForm() {
        if (titleProject.value !== "" && categoryProject.value !== "" && inputImage.value !== ""){
            validateProject.classList.toggle("active");
            errorForm.style.display = 'none';
        } else {
            errorForm.innerText = "Veuillez renseigner tous les champs";
        }
    };

    // Fonction pour valider le formulaire
    async function validationFormModale () {
        // Sélection des infos pour soumettre le formulaire
        const inputImageUrl = document.getElementById("addPhoto").files[0];
        const titleProject = document.getElementById("photoTitle").value;
        const categoryProject = document.getElementById("photoCategories").value;

        // Sélection des galeries et de la modale
        const gallery = document.querySelector(".gallery");
        const galleryModale = document.querySelector(".modalePage1_gallery");
        const modaleContainer = document.querySelector(".modalecontainer");
        
        /* Test de récupération des infos
           console.log(inputImageUrl);
           console.log(titleProject);
           console.log(categoryProject);
        */
        // On crée le formulaire de soumission du projet
        let formData = new FormData();
        formData.append("image", inputImageUrl);
        formData.append("title", titleProject);
        formData.append("category", categoryProject);
        /* Test de vérification que le formulaire est bien créé
        console.log(formData);
        */
        const myToken = localStorage.getItem("token");
        /* Test de récupération du token d'authentification pour soumettre nouveau projet
        console.log(myToken);
        */    
            await fetch("http://localhost:5678/api/works", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${myToken}`,
                },
                body: formData,
            })
            // Si la réponse est OK (status 201)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } 
                throw new Error("Erreur lors du transfert");
            })
            .then((data) => {
                // Réinitialisation des galeries
                gallery.innerHTML = "";
                galleryModale.innerHTML = "";
                // On recharge dynamiquement les galeries
                getWorks();
                getWorksModale();
                displayNoneModale();
            })
            .catch((error) => {
                console.log(error);
            });
    };    

    // Evènement au clic pour soumettre le formulaire
    formModale.addEventListener("submit", (event) => {
        event.preventDefault();
        validationFormModale();
        resetForm();
        validateProject.classList.remove("active");
        
           console.log(inputImage.files)
           console.log(titleProject.value)
           console.log(categoryProject.value)
        
    });