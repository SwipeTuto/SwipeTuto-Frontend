// Récupérer les paramètres de l'URL dans les recherches par langage et catégorie
import HTMLLogo from "../assets/images/tech_logo/HTML.png";
import CSSLogo from "../assets/images/tech_logo/CSS.png";
import JavascriptLogo from "../assets/images/tech_logo/javascript.png";
import SassLogo from "../assets/images/tech_logo/sass.png";
import PythonLogo from "../assets/images/tech_logo/python.png";
import PHPLogo from "../assets/images/tech_logo/PHP.png";
import ReactJSLogo from "../assets/images/tech_logo/reactJS.png";
import NodeJSLogo from "../assets/images/tech_logo/nodeJS.png";
import allLogo from "../assets/images/tech_logo/all_logo.png";


export const urlParams = url => {

  var queryString = url.search ? url.search.split('?')[1] : window.location.search;
  const urlParams = new URLSearchParams(queryString);

  var topic = urlParams.get('topic')
  var category = urlParams.get('category')
  var ordering = urlParams.get('order')
  var search = urlParams.get('search')
  var page = urlParams.get('page')
  var card_id = urlParams.get('card_id');
  var user_id = urlParams.get('user_id');


  return [topic, category, ordering, search, page, card_id, user_id]
}

export const getUrlId = (url, query) => {
  return url && parseInt(url.split(`${query}=`)[1]);
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
export const commentsFormattedDate = (date) => {
  const dateDate = new Date(date)
  const now = new Date()
  const nowMS = now.getTime();
  const dateMS = dateDate.getTime();
  let oneDayMS = new Date(86400000);
  oneDayMS = oneDayMS.getTime();
  let oneHourMS = new Date(3600000);
  oneHourMS = oneHourMS.getTime();
  let formattedDateValue;

  // si le même jour, calcul nb heure, sinon date entière
  if (dateMS > nowMS - oneDayMS) {
    if (dateMS > nowMS - oneHourMS) {
      formattedDateValue = "Moins d'une heure."
    } else {
      let diff = new Date(nowMS - dateMS);
      diff = diff.getTime();
      formattedDateValue = `${Math.floor(diff / oneHourMS)}h`;
    }
  } else {
    const day =
      dateDate.getDate() < 10
        ? `0${dateDate.getDate()}`
        : dateDate.getDate();
    const month =
      dateDate.getMonth() + 1 < 10
        ? `0${dateDate.getMonth() + 1}`
        : dateDate.getMonth() + 1;
    const year = dateDate.getFullYear();
    formattedDateValue = `${day}/${month}/${year}`;
  }
  return formattedDateValue;
};

export const formattedDate = (date) => {
  const dateDate = new Date(date)
  const day =
    dateDate.getDate() < 10
      ? `0${dateDate.getDate()}`
      : dateDate.getDate();
  const month =
    dateDate.getMonth() + 1 < 10
      ? `0${dateDate.getMonth() + 1}`
      : dateDate.getMonth() + 1;
  const year = dateDate.getFullYear();
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
  return (firstname.slice(0, 1) + lastname.slice(0, 1)).toUpperCase();
};


// REGEX pour les inputs :
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

export const descriptionRegex = RegExp(/(.*?) {0,250}$/); // lettres entre 0 et 250 caractères
const descriptionErrorMessage = "Entrez une description valide, entre 0 et 250 caractères."

export const errorMessageToDisplay = (name) => {
  switch (name) {
    case "username":
      return usernameRegexErrorMessage;
    case "first_name":
      return firstnameRegexErrorMessage;
    case "last_name":
      return lastnameRegexErrorMessage;
    case "password":
      return passwordRegexErrorMessage;
    case "passwordConfirm":
      return passwordConfirmMessage;
    case "email":
      return emailRegexErrorMessage;
    case "url":
      return urlRegexErrorMessage;
    case "description":
      return descriptionErrorMessage
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
      return strongPasswordRegex.test(value);
    case "passwordConfirm":
      return strongPasswordRegex.test(value);
    case "email":
      return emailRegex.test(value);
    case "url":
      return urlRegex.test(value);
    case "description":
      return true;
    default:
      return;
  }
};


// liste des catégories 
export const categoryArray = [
  {
    queryName: null,
    name: "Tous",
  },
  {
    queryName: "theorie",
    name: "Théorie",
  },
  {
    queryName: "code",
    name: "Code",
  },
  {
    queryName: "memo",
    name: "Mémo",
  },
  {
    queryName: "design",
    name: "Design",
  },
  {
    queryName: "performances",
    name: "Performances",
  },
  {
    queryName: "ressources",
    name: "Ressources",
  },
  {
    queryName: "autre",
    name: "Autre",
  },
];


// liste des topics
export const topicArray = [
  {
    queryName: null,
    name: "Tous",
    logo: allLogo,
  },
  {
    queryName: "html",
    name: "HTML",
    logo: HTMLLogo,
  },
  {
    queryName: "css",
    name: "CSS",
    logo: CSSLogo,
  },
  {
    queryName: "javascript",
    name: "Javascript",
    logo: JavascriptLogo,
  },
  {
    queryName: "reactjs",
    name: "React JS",
    logo: ReactJSLogo,
  },
  {
    queryName: "nodejs",
    name: "Node JS",
    logo: NodeJSLogo,
  },
  {
    queryName: "python",
    name: "Python",
    logo: PythonLogo,
  },
  {
    queryName: "php",
    name: "PHP",
    logo: PHPLogo,
  },
  {
    queryName: "sass",
    name: "Sass",
    logo: SassLogo,
  },
];

export const orderArray = [
  {
    queryName: "-created",
    name: "Nouveau",
  },
  {
    queryName: "-update",
    name: "Modifié",
  },
  {
    queryName: "likes",
    name: "Populaire",
  }
]

export const getNameFromQueryName = (array, queryName) => {
  if (queryName === '' || undefined || null) {
    return array.filter(item => item.queryName === null)[0].name
  } else {
    return array.filter(item => item.queryName === queryName)[0].name
  }
}

export const initialSearchState = {
  searchWords: null,
  searchTopic: null,
  searchCategory: null,
  searchOrder: "-created",
  searchPage: 1,
}

