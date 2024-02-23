//AFFICHAGE DES TRAVAUX//
    async function getWorks() {
      await fetch("http://localhost:5678/api/works")
      .then(response => response.json()) //extraction des données OK puis :
      // traitement des données :
      .then(dataWorks => {
          const gallery = document.querySelector(".gallery");
          gallery.innerHTML = ""; //efface le contenu précèdent de la galerie (prévision de la modale)
          dataWorks.forEach((work) => {
              const card = document.createElement("figure");
              const imgCard = document.createElement("img");
              const titleCard = document.createElement("figcaption");
              imgCard.src = work.imageUrl; //src
              imgCard.alt = work.title; //alt
              imgCard.setAttribute('category', work.categoryId); //on stock l'ID de la categorie en créant un attribu
              titleCard.innerText = work.title;
              card.appendChild(imgCard);
              card.appendChild(titleCard);
              gallery.appendChild(card);
          });
      });   
  };
  
 //AFFICHAGE DES CATEGORIES//
  async function getCategories() {
      await fetch("http://localhost:5678/api/categories")
      .then(response => response.json()) //extraction des données OK puis :
      // traitement des données :
      .then(dataCategories => {
          const filters = document.querySelector(".filters") 
          const allFilter = document.createElement('p');
          allFilter.textContent = 'Tous';
          allFilter.classList.add("filter_unselected");
          allFilter.classList.add("filter_selected")
          filters.appendChild(allFilter);
          dataCategories.forEach((category) => {
             const nameFilters = document.createElement("p");
             nameFilters.innerText = category.name;
             nameFilters.id = category.id;
             nameFilters.classList.add("filter_unselected");
             filters.appendChild(nameFilters);   
          });

//LIAISON : EVENEMENT LORS DU CLICK -> FILTRE L'ID de L'IMAGE ET DE LA CATEGORIE//
          filters.querySelectorAll('p').forEach((filter) => {
              filter.addEventListener("click", function() { //ajout d'un évènement de click 
                  const id = this.id; //récupération de l'ID de l'élément sur lequel on clique
                  document.querySelectorAll('.gallery img').forEach(image => {
                      if (image.getAttribute('category') === id) { //VERIFICATION QUE LIMAGE A LE MEME ID QUE LA CATEGORIE//
                          image.parentElement.style.display = 'block'; //on affiche
                      } else {
                          image.parentElement.style.display = 'none'; //et on affiche pas
                      }  
                  });
              });
          });

//EXCEPTION DU FILTRE "TOUS"//
          allFilter.addEventListener('click', function () { //clique sur TOUS -> DONC AFFICHE TOUS//
              document.querySelectorAll('.gallery img').forEach(image => {
              image.parentElement.style.display = 'block';
              });
          }); 

//MODIFICATION CLASS DU FILTRE ACTIF//
          const elements = filters.querySelectorAll('p'); 
          elements.forEach((element) => {
              element.addEventListener("click", () => {
                  elements.forEach((element) => {
                      element.classList.remove("filter_selected");
                      });
                      element.classList.add("filter_selected"); 
              });
          });  
      });
  };

