// VERIFICATION DE LA CONNECTION OK OU KO
async function checkUserConnected () {
    const token = localStorage.getItem('token');
    /* Vérification présence token */
    console.log(token);
    
   const userConnected = token != null && token != undefined && token != '';
   
   if (userConnected) {
      // Si l'utilisateur est connecté 
         // Changement du bouton "login" en "logout" + déconnexion 
         const loginLink = document.querySelector(".loginNav");
         loginLink.textContent = "logout";
         loginLink.addEventListener("click", userLogOut);

         // Affichage des éléments : barre d'édition, boutons "modifier"
         const navEdition = document.getElementById('navEdit');
         navEdition.style.display = 'flex';
         const buttonModify = document.querySelector(".modify");
         buttonModify.style.display = 'block';

         // Les filtres sont masqués
         const filtersSection = document.querySelector(".filters");
         filtersSection.style.display = 'none';
   } else {
      // Si l'utilisateur est déconnecté
         // Logout redevient login
         const loginLink = document.querySelector(".loginNav");
         loginLink.textContent = "login";

         // Les éléments d'édition sont masqués
         const navEdition = document.getElementById('navEdit');
         navEdition.style.display = 'none';

         const buttonModify = document.querySelector(".modify");
         buttonModify.style.display = 'none';

         // Les filtres sont visibles 
         const filtersSection = document.querySelector(".filters");
         filtersSection.style.display = 'flex';
   }
}

// Fonction de déconnexion
function userLogOut() {
   // Nettoyage du localStorage => suppression du token
   localStorage.clear();
   // Rechargement de la page 
   window.location.reload();
}