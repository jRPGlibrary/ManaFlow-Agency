// Script dédié pour gérer les liens sociaux et email
document.addEventListener('DOMContentLoaded', function() {
  // Sélectionner tous les liens sociaux et email
  const allLinks = document.querySelectorAll('.social-link, .email-link');
  
  // Ajouter des gestionnaires d'événements à chaque lien
  allLinks.forEach(link => {
    // Supprimer l'attribut onclick existant pour éviter les conflits
    link.removeAttribute('onclick');
    
    // Ajouter un nouvel écouteur d'événements
    link.addEventListener('click', function(e) {
      // Empêcher le comportement par défaut
      e.preventDefault();
      
      // Récupérer l'URL du lien
      const url = this.getAttribute('href');
      
      // Gestion spéciale pour les liens email
      if (url.startsWith('mailto:')) {
        window.location.href = url;
      } else {
        // Ouvrir l'URL dans un nouvel onglet pour les autres liens
        window.open(url, '_blank');
      }
      
      // Journaliser pour le débogage
      console.log('Lien cliqué:', url);
    });
  });
  
  console.log('Gestionnaires d\'événements des liens initialisés');
});