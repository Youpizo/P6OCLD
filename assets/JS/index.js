//Attente du chargement HTML : 
window.addEventListener("DOMContentLoaded", (event) => { 
    initWorks(); 
  });

//Attente du chargement initworks, puis charge : 
async function initWorks() {
    getWorks();
    getCategories();
    checkUserConnected();
}

