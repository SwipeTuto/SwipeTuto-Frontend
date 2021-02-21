// Passer du nom de catégorie minuscule / sans accent à majuscule / avec accent
export const renameQuery = (query) => {
  switch (query) {
    case null:
      return "Tous";
    case "technologie":
      return "Technologie";
    case "cuisine":
      return "Cuisine";
    case "maison":
      return "Maison";
    case "beaute":
      return "Beauté";
    case "bienetre":
    case "bien-être":
      return "Bien-être";
    case "informatique":
      return "Informatique";
    case "design":
      return "Design";
    case "photo":
      return "Photo";
    case "video":
      return "Vidéo";
    case "programmation":
      return "Programmation";
    case "nutrition":
      return "Nutrition";
    case "entrees":
      return "Entrées";
    case "plats":
      return "Plats";
    case "desserts":
      return "Desserts";
    case "vege":
      return "Végétarien / Vegan";
    case "Végétarien / Vegan":
      return "Sans gluten";
    case "decoration":
      return "Décoration";
    case "bricolage":
      return "Bricolage";
    case "jardinage":
      return "Jardinage";
    case "vetements":
      return "Vêtements";
    case "maquillage":
      return "Maquillage";
    case "coiffure":
      return "Coiffure";
    case "accessoires":
      return "Accessoires";
    case "sport":
      return "Sport";
    case "yoga":
      return "Yoga";
    case "devperso":
      return "Développement personnel";
    case "meditation":
      return "Méditation";
    case "autre":
      return "Autre";
    default:
      return query;
  }
}