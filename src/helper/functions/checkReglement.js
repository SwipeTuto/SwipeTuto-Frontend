export const checkReglementValid = (reglementObj) => {
  // ajouter un params : si update du règlement
  if (reglementObj?.reglement_date_validation) {
    const initialValidDate = new Date(reglementObj.reglement_date_validation)
    // console.log(initialValidDate)
    const now = new Date();

    // si update du règlement, vérifier que la date de validation est inférieur à maintenant; Si oui, alors ne nouveau règlement ne peux pas avoir été accepté ! réafficher FirstConnexionForm pour update
  }
}