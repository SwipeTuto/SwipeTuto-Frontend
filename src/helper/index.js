// Récupérer les paramètres de l'URL dans les recherches par langage et catégorie
export const urlParams = url => {

  var queryString = url.search ? url.search.split('?')[1] : window.location.search;
  const urlParams = new URLSearchParams(queryString);

  var langage = urlParams.get('langage')
  var category = urlParams.get('category')
  var ordering = urlParams.get('ordering')


  return [langage, category, ordering]
}


// Pour les mots / phrases trop longue, permet de couper. Params : phrase, nombre de caractères max, true/false pour couper les mots
export const truncate = (str, n, useWordBoundary) => {
  if (str.length <= n) {
    return str;
  }
  const subString = str.substr(0, n - 1); // the original check
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(" "))
      : subString) + "..."
  );
};


// renvoyer un objet date au format JJ/MM/AAAA
export const formattedDate = (date) => {
  const day =
    date.getDate() < 10
      ? `0${date.getDate()}`
      : date.getDate();
  const month =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};


// Passer du nom de catégorie minuscule / sans accent à majuscule / avec accent
export const renameCategory = (category) => {
  switch (category) {
    case "theorie":
      return "Théorie";
    case "code":
      return "Code";
    case "design":
      return "Design";
    case "performances":
      return "Performances";
    case "ressources":
      return "Ressources";
    case "autre":
      return "Autre";
    default:
      return category;
  }
}

// Récupérer les initiales :
export const getInitials = (firstname, lastname) => {
  console.log(firstname, lastname);
  return (firstname.slice(0, 1) + lastname.slice(0, 1)).toUpperCase();
};


// REGEX pour les inputs :
export const emailRegex = RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/); // exemple@test.com
export const emailRegexErrorMessage = "Votre email n'est pas dans un format valide. Merci d'utiliser un email au format exemple@exemple.com";

export const usernameRegex = RegExp(/^[a-zA-Z0-9_-]{3,16}$/); // lettres et chiffres et _ ou - entre 3 et 16 caractères
export const usernameRegexErrorMessage = "Votre Pseudo doit faire entre 3 et 16 caractères. Il peut contenir des chiffres et des lettres mais aucun caractère spécial excepté '-' et '_'.";

export const nameRegex = RegExp(/^[A-Za-zÀ-ÿ]{2,16}$/); // lettres et chiffres et _ ou - entre 3 et 16 caractères
export const nameRegexErrorMessage = "Votre Nom et Prénom ne doivent contenir que des lettres.";

export const urlRegex = RegExp(/[https:\/\/www.a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
// export const urlRegex = RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/);
export const urlRegexErrorMessage = "L'URL n'est pas dans un format valide. Merci d'utiliser un URL https au format valide.";

export const strongPasswordRegex = RegExp(/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/); //1 lowercase, 1 uppercase, 1 number, 8 caractères mini
export const passwordRegexErrorMessage = "Le mot de passe doit contenir au moins 8 caratcères, dont une lettre minuscule, une lettre majuscule et un nombre.";
const passwordConfirmMessage = "Le mot de passe ne correspond pas à celui ajouté précédemment."

export const errorMessageToDisplay = (name) => {
  switch (name) {
    case "username":
      return usernameRegexErrorMessage;
    case "firstname":
      return nameRegexErrorMessage;
    case "lastname":
      return nameRegexErrorMessage;
    case "password":
      return passwordRegexErrorMessage;
    case "passwordConfirm":
      return passwordConfirmMessage;
    case "email":
      return emailRegexErrorMessage;
    case "url":
      return urlRegexErrorMessage;
    default:
      return;
  }
};
// cas avatar ?

export const checkRegexInput = (name, value) => {
  switch (name) {
    case "username":
      return usernameRegex.test(value);
    case "firstname":
      return nameRegex.test(value);
    case "lastname":
      return nameRegex.test(value);
    case "password":
      return strongPasswordRegex.test(value);
    case "email":
      return emailRegex.test(value);
    case "url":
      return urlRegex.test(value);
    default:
      return;
  }
};
// cas avatar ?