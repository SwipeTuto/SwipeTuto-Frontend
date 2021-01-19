export const getCategoriesArray = (topic) => {
  switch (topic) {
    case "technologie":
      return [
        {
          queryName: null,
          name: "Tous"
        },
        {
          queryName: "informatique",
          name: "Informatique"
        },
        {
          queryName: "design",
          name: "Design"
        },
        {
          queryName: "photo",
          name: "Photo"
        },
        {
          queryName: "video",
          name: "Vidéo"
        },
        {
          queryName: "programmation",
          name: "Programmation"
        },
        {
          queryName: "autre",
          name: "Autre"
        },
      ];
    case "cuisine":
      return [
        {
          queryName: null,
          name: "Tous"
        },
        {
          queryName: "nutrition",
          name: "Nutrition"
        },
        {
          queryName: "entrees",
          name: "Entrées"
        },
        {
          queryName: "plats",
          name: "Plats"
        },
        {
          queryName: "desserts",
          name: "Desserts"
        },
        {
          queryName: "vege",
          name: "Végétarien / Vegan"
        },
        {
          queryName: "sansgluten",
          name: "Sans gluten"
        },
        {
          queryName: "autre",
          name: "Autre"
        },
      ];
    case "maison":
      return [
        {
          queryName: null,
          name: "Tous"
        },
        {
          queryName: "decoration",
          name: "Décoration"
        },
        {
          queryName: "bricolage",
          name: "Bricolage"
        },
        {
          queryName: "jardinage",
          name: "Jardinage"
        },
        {
          queryName: "autre",
          name: "Autre"
        },
      ];
    case "beaute":
      return [
        {
          queryName: null,
          name: "Tous"
        },
        {
          queryName: "vetements",
          name: "Vêtements"
        },
        {
          queryName: "maquillage",
          name: "Maquillage"
        },
        {
          queryName: "coiffure",
          name: "Coiffure"
        },
        {
          queryName: "accessoires",
          name: "Accessoires"
        },
        {
          queryName: "autre",
          name: "Autre"
        },
      ];
    case "bienetre":
      return [
        {
          queryName: null,
          name: "Tous"
        },
        {
          queryName: "sport",
          name: "Sport"
        },
        {
          queryName: "yoga",
          name: "Yoga"
        },
        {
          queryName: "devperso",
          name: "Développement personnel"
        },
        {
          queryName: "meditation",
          name: "Méditation"
        },
        {
          queryName: "autre",
          name: "Autre"
        },
      ];
    case "autre":
      return [
        {
          queryName: null,
          name: "Tous"
        },
      ]
    default:
      return [
        {
          queryName: null,
          name: "Tous"
        },
      ]
  }
}