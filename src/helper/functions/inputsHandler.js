export const emailRegex = RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/); // exemple@test.com
export const emailRegexErrorMessage = "Votre email n'est pas dans un format valide. Merci d'utiliser un email au format exemple@exemple.com";

export const usernameRegex = RegExp(/^[a-zA-Z0-9_-]{3,16}$/); // lettres et chiffres et _ ou - entre 3 et 16 caractères
export const usernameRegexErrorMessage = "Votre Pseudo doit faire entre 3 et 16 caractères. Il peut contenir des chiffres et des lettres mais aucun caractère spécial excepté '-' et '_'.";

export const nameRegex = RegExp(/^[A-Za-zÀ-ÿ]{2,16}$/); // lettres entre 2 et 16 caractères
export const firstnameRegexErrorMessage = "Votre Prénom ne doit contenir que des lettres et contenir entre 2 et 16 caractères.";
export const lastnameRegexErrorMessage = "Votre Nom ne doit contenir que des lettres et contenir entre 2 et 16 caractères.";

export const urlRegex = RegExp(/[https://www.a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/);
export const urlRegexErrorMessage = "L'URL n'est pas dans un format valide. Merci d'utiliser un URL https au format valide.";

export const strongPasswordRegex = RegExp(/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/); //1 lowercase, 1 uppercase, 1 number, 8 caractères mini
export const passwordRegexErrorMessage = "Le mot de passe doit contenir au moins 8 caratcères, dont une lettre minuscule, une lettre majuscule et un nombre.";
const passwordConfirmMessage = "Le mot de passe ne correspond pas à celui ajouté précédemment."

const descriptionErrorMessage = "Entrez une description valide, entre 0 et 250 caractères."
const commentErrorMessage = "Veuillez rédiger un commentaire pour l'envoyer."
const cardTitleErrorMessage = "Le titre de votre carte doit contenir entre 0 et 250 caractères."
const cardDescriptionErrorMessage = "La description de votre carte ne peut pas être vide."

export const errorMessageToDisplay = (name) => {
  switch (name) {
    case "username":
      return usernameRegexErrorMessage;
    case "first_name":
      return firstnameRegexErrorMessage;
    case "last_name":
      return lastnameRegexErrorMessage;
    case "password":
    case "oldPassword":
      return passwordRegexErrorMessage;
    case "passwordConfirm":
      return passwordConfirmMessage;
    case "email":
      return emailRegexErrorMessage;
    case "url":
      return urlRegexErrorMessage;
    case "description":
      return descriptionErrorMessage
    case "card_title":
      return cardTitleErrorMessage;
    case "card_description":
      return cardDescriptionErrorMessage;
    case "comment":
    case "response":
      return commentErrorMessage
    default:
      return;
  }
};

export const checkRegexInput = (name, value) => {
  switch (name) {
    case "username":
      return usernameRegex.test(value);
    case "first_name":
      return nameRegex.test(value);
    case "last_name":
      return nameRegex.test(value);
    case "password":
    case "oldPassword":
      return strongPasswordRegex.test(value);
    case "passwordConfirm":
      return strongPasswordRegex.test(value);
    case "email":
      return emailRegex.test(value);
    case "url":
      return urlRegex.test(value);
    case "description":
    case "card_title":
      return (value.length >= 0 && value.length <= 250);
    case "comment":
    case "card_description":
    case "response":
      return (value.length > 0);
    default:
      return;
  }
};