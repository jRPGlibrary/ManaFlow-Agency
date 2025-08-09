// Script dédié pour gérer les liens sociaux et email
document.addEventListener('DOMContentLoaded', function() {
  // Sélectionner tous les liens sociaux et email
  const allLinks = document.querySelectorAll('.social-link, .email-link'); // .email-link conservé si encore présent ailleurs
  
  // Ajouter des gestionnaires d'événements à chaque lien
  allLinks.forEach(link => {
    // Supprimer l'attribut onclick existant pour éviter les conflits
    link.removeAttribute('onclick');
    
    // Ajouter un nouvel écouteur d'événements
    link.addEventListener('click', function(e) {
      // Récupérer l'URL du lien
      const url = this.getAttribute('href') || '';

      // Si c'est un lien email, on laisse le comportement natif du navigateur (pas de preventDefault)
      if (url.startsWith('mailto:')) {
        console.log('Lien mailto natif:', url);
        return; // Laisse le navigateur ouvrir le client mail
      }

      // Pour les autres liens, empêcher le comportement par défaut et ouvrir dans un nouvel onglet
      e.preventDefault();
      window.open(url, '_blank', 'noopener,noreferrer');

      // Journaliser pour le débogage
      console.log('Lien externe ouvert dans un nouvel onglet:', url);
    });
  });
  
  console.log('Gestionnaires d\'événements des liens initialisés');
});