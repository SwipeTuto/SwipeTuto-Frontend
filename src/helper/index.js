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


export const stringToHTML = (str) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  return doc.body;
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

// export const descriptionRegex = RegExp(/(.*?){0,250}$/); // lettres entre 0 et 250 caractères
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


export const topicArray = [
  {
    queryName: null,
    name: "Tous",
    // logo: allLogo,
  },
  {
    queryName: "technologie",
    name: "Technologie",
    // logo: HTMLLogo,
  },
  {
    queryName: "cuisine",
    name: "Cuisine",
    // logo: CSSLogo,
  },
  {
    queryName: "maison",
    name: "Maison",
    // logo: JavascriptLogo,
  },
  {
    queryName: "beaute",
    name: "Beauté",
    // logo: ReactJSLogo,
  },
  {
    queryName: "bienetre",
    name: "Bien-être",
    // logo: NodeJSLogo,
  },
  {
    queryName: "autre",
    name: "Autre",
    // logo: NodeJSLogo,
  },

];

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

export const copyToClipboard = async (content) => {
  if (!content) return false
  try {
    await navigator.clipboard.writeText(content)
    return true;

  } catch (err) {
    return false
  }
}

export const convertNumber = (number) => {
  const value = parseInt(number)
  if (value >= 0 && value < 1000) {
    return value;
  } else if (value >= 1000 && value < 10000) {
    return `${(value / 1000).toFixed(1)}k`;

  } else if (value >= 10000 && value < 1000000) {
    return `${(value / 1000).toFixed(0)}k`;

  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  }
}

export const initialSearchState = {
  searchWords: null,
  searchTopic: null,
  searchCategory: null,
  searchOrder: "likes",
  searchPage: 1,
}
export const initialSignalState = {
  id_card: null,
  id_user: null,
  id_comment: null,
}


export const likeUpdate = (cardId) => {
  console.log(cardId)
  const likedCardText = document.getElementById(`likesNumber${cardId}`);
  const heartEl = document.getElementById(`CardPreviewSmall__heart${cardId}`);
  const likesNumberPopupLogo = document.getElementById(`likesNumberPopupLogo${cardId}`)
  const likesNumberPopupNumber = document.getElementById(`likesNumberPopupNumber${cardId}`)
  console.log(likesNumberPopupLogo, likesNumberPopupNumber)
  if (heartEl && heartEl.classList.contains("active") && likedCardText) {
    likedCardText.textContent = parseInt(likedCardText.textContent) - 1;
    heartEl.classList.remove("active");
  } else if (heartEl && likedCardText) {
    likedCardText.textContent = parseInt(likedCardText.textContent) + 1;
    heartEl.classList.add("active");
  }

  if (likesNumberPopupLogo && likesNumberPopupLogo.classList.contains("active") && likesNumberPopupNumber) {
    likesNumberPopupNumber.textContent = parseInt(likesNumberPopupNumber.textContent) - 1;
    likesNumberPopupLogo.classList.remove("active");
    console.log('remove class')
  } else if (likesNumberPopupLogo && likesNumberPopupNumber) {
    likesNumberPopupNumber.textContent = parseInt(likesNumberPopupNumber.textContent) + 1;
    likesNumberPopupLogo.classList.add("active");
    console.log('add class')
  }
};



// function removeBlockFromBlockMap(editorState: EditorState, blockKey: string) {
//   var contentState = editorState.getCurrentContent();
//   var blockMap = contentState.getBlockMap();
//   var newBlockMap = blockMap.remove(blockKey)
//   var newContentState = contentState.merge({
//     blockMap: newBlockMap
//   })
//   export { removeBlockFromBlockMap as Draft.Model.ImmutableData.ContentState }
//   var newEditorState = EditorState.push(editorState, newContentState, 'remove-range')
//   return newEditorState
// }