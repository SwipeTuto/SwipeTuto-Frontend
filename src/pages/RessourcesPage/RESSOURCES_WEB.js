import mdn from "../../assets/images/screens/mdn.png";
import w3schools from "../../assets/images/screens/w3schools.png";
import opc from "../../assets/images/screens/opc.png";
import fcc from "../../assets/images/screens/fcc.png";
import alsa from "../../assets/images/screens/alsa.png";
import csstricks from "../../assets/images/screens/csstricks.jpg";
import fcclogo from "../../assets/images/screens/fcclogo.jpg";
import flexboxfroggy from "../../assets/images/screens/flexboxfroggy.png";



export const RESSOURCES_WEB = [
  {
    title: "Apprendre",
    id: "learn",
    note: "Des ressources en Français et en Anglais pour commencer à apprendre mais aussi pour trouver des informations.",
    ressources: [
      {
        nom: "MDN Mozilla",
        lien: "https://developer.mozilla.org/fr/",
        image: mdn,
        description: "Ressources en Français sur de nombreuses propriétés HTML, CSS & Javascript."
      },
      {
        nom: "w3schools",
        lien: "https://www.w3schools.com/",
        image: w3schools,
        description: "Ressources en Anglais sur de nombreuses propriétés HTML, CSS & Javascript, avec des exemples de codes, d'exercices et de tutoriels."
      },
      {
        nom: "Openclassrooms",
        lien: "https://openclassrooms.com/fr/",
        image: opc,
        description: "Plusieurs cours gratuits en Français, assez complet pour commencer à apprendre de nouvelles notions."
      },
      {
        nom: "FreeCodeCamp",
        lien: "https://www.freecodecamp.org/",
        image: fcc,
        description: "Site en Anglais basé sur la pratique avec une (très longue) liste d'exercices pour aborder chaque notion. Un contenu extrêment riche et complet !"
      },
      {
        nom: "AlsaCréations",
        lien: "https://www.alsacreations.com/",
        image: alsa,
        description: "Ressources en Français sur de nombreuses propriétés HTML, CSS & Javascript avec des tutoriels et une grande communeauté."
      },
      {
        nom: "CSS-Tricks",
        lien: "https://css-tricks.com/",
        image: csstricks,
        description: "Ressources en Anglais qui présente d'innombrables tutoriels pour créer des éléments en CSS."
      },
      {
        nom: "Collection de cours gratuits",
        lien: "https://www.freecodecamp.org/news/tag/online-courses/",
        image: fcclogo,
        description: "FreeCodeCamp rassemble souvent des tonnes de cours disponibles gratuitement un peu partout sur internet."
      },
      {
        nom: "Flexbox Froggy",
        lien: "https://flexboxfroggy.com/#fr",
        image: flexboxfroggy,
        description: "Il s'agit d'un jeu pour apprendre à utiliser Flexbox en CSS. Vous y trouverez également un lien vers le jeu Grid Garden qui permet d'apprendre CSS grid."
      },
      {
        nom: "Udemy",
        lien: "https://www.udemy.com/",
        description: "Des cours gratuits et payants. Attendez les promotions (qui arrivent très souvent) pour avoir des cours peu chers.Privilégiez les cours Anglais qui seront souvent les meilleurs."
      },
      {
        nom: "SkillShare",
        lien: "https://www.skillshare.com/",
        description: "D'innombrables cours mais payants, comme sur Udemy. Cependant, ici vous payez au mois et avez accès à tous les cours disponibles."
      },
    ]
  },
  {
    title: "Coder",
    id: "outils_code",
    note: "Des outils et ressources pour faciliter la programmation web.",
    ressources: [
      {
        nom: "CodePen",
        lien: "https://codepen.io/",
        description: "Permet de coder directement dans votre navigateur et de visualiser le résultat en live. Vous pourrez aussi regarder les projets d'autres utilisateurs pour y trouver de l'inspiration."
      },
      {
        nom: "JSbin",
        lien: "https://jsbin.com/",
        description: "Permet de coder directement dans votre navigateur et de visualiser le résultat en live. Supporte de nombreux langages y comprit des frameworks / librairies. Possède une interface simple."
      },
      {
        nom: "CodeSandbox",
        lien: "https://codesandbox.io/",
        description: "Permet de coder directement dans votre navigateur et de visualiser le résultat en live. Supporte de nombreux langages y comprit des frameworks / librairies."
      },

      {
        nom: "VS Code",
        lien: "https://code.visualstudio.com/",
        description: "Sans doute le meilleur logiciel pour coder. En plus de nombreuses fonctionnalités intégrées de base, vous pourrez personnaliser votre logiciel grâce aux extensions."
      },
      {
        nom: "Github",
        lien: "https://github.com/",
        description: "Un hébergeur indispensable de la programmation Web. Pour pourrez y stocker vos codes, les récupérer, les modifier, et travailler en équipe sur un même projet grâce à Git."
      },
      {
        nom: "Postimage",
        lien: "https://postimages.org/",
        description: "Heberbez votre image en ligne en un clic. Vous y aurez alors accès via un url."
      },
      {
        nom: "Startupsum",
        lien: "https://startupsum.com/",
        description: "Générateur de paragraphes pour donner vie à votre site. Créer des paragraphe qui ont du sens, avec plusieurs type (voyage, nourriture, mode, médical...). Nombre de paragraphes et tailles ajustables."
      },
      {
        nom: "Loripsum",
        lien: "https://loripsum.net/",
        description: "Générateur de paragraphes pour donner vie à votre site. Créer des paragraphe dans lesquels de nombreux éléments HTML sont déjà intégré (listes, citations, texte gras etc...)."
      },
      {
        nom: "Picsum",
        lien: "https://picsum.photos/",
        description: "Trouver une image rapidement pendant la création de votre projet web ? Voici de quoi génerer une image aléatoire. Vous pouvez spécifier une catégorie, un id, la taille de l'image souhaitée, ou même des effets !"
      },
      {
        nom: "CORS anywhere",
        lien: "https://cors-anywhere.herokuapp.com/",
        description: "Un proxy à utiliser pour éviter les CORS error."
      },
      {
        nom: "Keycode",
        lien: "https://keycode.info/",
        description: "Obtenir rapidement le keycode des touches de votre clavier."
      },
      {
        nom: "Public API - Github",
        lien: "https://github.com/public-apis/public-apis",
        description: "Une liste d'APIs gratuites à utiliser pour vos projets. Vous y trouverez tout ce dont vous avez besoin : météo, profil d'utilisateur aléatoire, sport, shopping, sécurité, science ..."
      },

    ]
  },
  {
    title: "Couleurs",
    id: "colors",
    note: "De quoi générer des palettes de couleurs et des dégradés facilement grâce à des outils performants.",
    ressources: [
      {
        nom: "Coolors",
        lien: "https://coolors.co/",
        description: "Outil de création de palette de couleurs ultra modulable, facile de prise en main et très complet."
      },
      {
        nom: "Material Palette",
        lien: "https://www.materialpalette.com/",
        description: "Générateur de palette assez limité en options mais avec un retour visuel sur une application basique pour se donner une idée concrète."
      },
      {
        nom: "Color Hunt",
        lien: "https://colorhunt.co/",
        description: "Assez populaire, porpose des palettes de couleurs créées par d'autres utilisateurs."
      },
      {
        nom: "Adobe Color",
        lien: "https://color.adobe.com/fr/create/color-wheel",
        description: "Permet de créer des palettes de couleurs assez intuitivement et suivant des schémas logiques. Fonctionne avec les autres services d'Adobe."
      },
      {
        nom: "Webgradients",
        lien: "https://webgradients.com/",
        description: "Propose une série de dégradés prêts à l'emploi ! En un clic, le code CSS pour générer le gradient est copié : il suffit de le coller à l'endroit souhaité."
      },
      {
        nom: "LarsenWork",
        lien: "https://larsenwork.com/easing-gradients/#editor",
        description: "Permet de créer des dégradés à moitié transparents pour y afficher un texte par-dessus une image par exemple."
      },
      {
        nom: "CoolHue",
        lien: "https://webkul.github.io/coolhue/",
        description: "Liste de gradients aux couleurs flashs et dynamique. Le code CSS est copié en un clic sur le gradient."
      },
      {
        nom: "MyColor.space",
        lien: "https://mycolor.space/",
        description: "Un site qui propose à la fois de créer des palettes de couleurs mais également des dégradés à deux couleurs ou plus !"
      },
    ]
  },
  {
    title: "Images & Vidéos",
    id: "free_medias",
    note: "Ces ressources proposent du contenu gratuit et libre de droits, mais pensez à toujours vérifier les conditions d'utilisation et de license. Dans certains cas (rares) vous aurez besoin de citer l'auteur ou le site qui propose le contenu.",
    ressources: [

      {
        nom: "Pexels",
        lien: "https://www.pexels.com/fr-fr/",
        description: "Une grande banque d'images et de vidéos."
      },
      {
        nom: "Pixabay",
        lien: "https://pixabay.com/fr/",
        description: "Une grande banque d'images et de vidéos. Propose également de nombreuses illustrations et PNG."
      },
      {
        nom: "Unsplash",
        lien: "https://unsplash.com/",
        description: "Une grande banque d'images et de vidéos. Système de catégorisation efficace qui rend la recherche rapide & facile."
      },
      {
        nom: "EveryPixel",
        lien: "https://www.everypixel.com/",
        description: "Système de recherche au travers de 50 banques d'image, avec filtration par prix (uniquement gratuit possible), et type d'image (photo, vectoriel, dessins)."
      },
      {
        nom: "icons8",
        lien: "https://icons8.com/",
        description: "Des photos, des dessins vectoriels, des musiques, des outils, mais également des icones gratuites ! Attention à bien lire les conditions d'utilisation (https://icons8.com/license)."
      },
      {
        nom: "Gratisography",
        lien: "https://gratisography.com/",
        description: "Une banque d'images décalées au style très original et particulier. Si vous recherchez des images pour vous démarquer, c'est ici !"
      },
      {
        nom: "Coverr",
        lien: "https://coverr.co/",
        description: "Des vidéos de bonnes qualité classées en catégories."
      },
      {
        nom: "Mixkit",
        lien: "https://mixkit.co/",
        description: "Des vidéos, des musiques, mais également des templates pour Adobe Premiere."
      },
      {
        nom: "StockSnap",
        lien: "https://stocksnap.io/",
        description: "Librairie d'images."
      },
      {
        nom: "Videvo",
        lien: "https://www.videvo.net/",
        description: "Propose des vidéos, musiques et sons. Les vidéos sont en HD et 4K."
      },
      {
        nom: "LifeOfVids",
        lien: "https://lifeofvids.com/",
        description: "Des vidéos pratiques à utiliser comme fond."
      },
    ]
  },
  {
    title: "Icônes",
    id: "icones",
    note: "Des icônes souvent gratuites et libres de droits (merci de toujours vérifier les licenses avant utilisations), faciles d'utilisation. ",
    ressources: [
      {
        nom: "FontAwesome",
        lien: "https://fontawesome.com/",
        description: "Un indispensable pour les logos, qui propose beaucoup de contenu. Les icônes sont très facilement stylisable (on peut y appliquer les styles comme pour du texte !)."
      },
      {
        nom: "Ionicons",
        lien: "https://ionicons.com/",
        description: "Difficile de faire plus simple à utiliser que celui-ci. Il suffit d'implémenter un CDN et de copier les tags HTML généré au clic sur une icône pour le mettre dans votre code, et le tour est joué !"
      },
      {
        nom: "IconStore",
        lien: "https://iconstore.co/",
        description: "Propose des packs d'icônes sous forme d'illustrations, avec un très large choix. Permet d'avoir une cohérence graphique dans les illustrations utilisées."
      },
      {
        nom: "Boxicons",
        lien: "https://boxicons.com/",
        description: "large choix d'icônes pour le web et très facile d'utilisation. Possibilité de l'installer avec NPM. Documentation complète et facile à comprendre."
      },
      {
        nom: "Flaticon",
        lien: "https://www.flaticon.com/",
        description: "Très large choix d'icônes sous forme de packs, mais nécessite souvent de citer l'auteur. Cependant, la license et la manière dont doit être cité l'auteur sont clairement expliquées."
      },
    ]
  },
  {
    title: "Illustrations",
    id: "illustrations",
    note: "Des illustrations gratuites et libres de droits, en dessins vectoriels ou PNG. Pensez à vérifier les licenses avant utilisation.",
    ressources: [
      {
        nom: "unDraw",
        lien: "https://undraw.co/illustrations",
        description: "Un indispensable pour illustrer votre site web. Vous y trouverez de nombreuses illustrations au format vectoriel ou png, et facilement customisable avec la couleur de votre choix."
      },
      {
        nom: "DrawKit",
        lien: "https://www.drawkit.io/free",
        description: "D'autres illustrations de qualité pour votre site web. Style épuré et simple."
      },
      {
        nom: "Lukaszadam",
        lien: "https://lukaszadam.com/illustrations",
        description: "Un illustrateur nous met à disposition certains de ses dessins. Son style vaut le détour !"
      },
      {
        nom: "Pixeltrue",
        lien: "https://www.pixeltrue.com/free-illustrations",
        description: "D'autres illustration dans un style cartoon très design et épuré. Propose également quelques animations pour les SVG."
      },
      {
        nom: "Opendoodles",
        lien: "https://www.opendoodles.com/",
        description: "Des dessins SVG ou PNG dans un style cartoon très sympathiques et original, dont certains sont animés."
      },
      {
        nom: "Isoflat",
        lien: "https://isoflat.com/",
        description: "Des dessins complets au style Flat design réalisés par des illustrateurs. Notez que le site recommande de contacter les auteurs si vous souhaitez utiliser leurs dessins dans un projet commercial."
      },
      {
        nom: "Facebook Design",
        lien: "https://facebook.design/toolsandresources/",
        description: "Des designs proposés gratuitement par Facebook. Vous trouverez en particulier des dessins d'appareils (ordinateur, tablette, téléphone)."
      },
    ]
  },
  {
    title: "Polices",
    id: "fonts",
    note: "Polices d'écritures pour personnaliser un peu plus votre création.",
    ressources: [
      {
        nom: "Font Joy",
        lien: "https://fontjoy.com/",
        description: "Avant toute chose, si on regardait ce que donne des polices d'écritures sur un vrai site ? ici vous pourrez voir des combinaisons de polices dans un cas concret."
      },
      {
        nom: "Google Fonts",
        lien: "https://fonts.google.com/",
        description: "Google Fonts est très facile et intuitif à utiliser. Il propose un large choix de polices d'écriture avec des variantes pour chacune."
      },
      {
        nom: "Dafont",
        lien: "https://www.dafont.com/fr/",
        description: "Propose une tonne de polices d'écritures filtrables par genre, langue et thème."
      },
      {
        nom: "1001 Free Fonts",
        lien: "https://www.1001freefonts.com/",
        description: "Beaucoup de polices d'écritures avec prévisualisation, taille, couleur; ainsi qu'une recherche par thématique et ordre alphabétique."
      },
      {
        nom: "Font Squirrel",
        lien: "https://www.fontsquirrel.com/",
        description: "Une grande collection de polices d'écritures."
      },
      {
        nom: "WhatFont",
        lien: "https://chrome.google.com/webstore/detail/whatfont/jabopobgcpjmedljpbcaablpmlmfcogm?hl=fr",
        description: "Vous n'avez toujours pas trouvé ? Et si vous regardiez d'autres sites pour vous inspirer ? Avec cette extension à Google Chrome, vous pourrez regarder la police utiliser directement sur d'autres sites."
      },

    ]
  },
  {
    title: "CSS",
    id: "ressources-css",
    note: "Des ressources utiles pour faciliter le code CSS.",
    ressources: [
      {
        nom: "Animate Style",
        lien: "https://animate.style/",
        description: "Des animations CSS prêtes à l'emploi. Installation avec NPM."
      },
      {
        nom: "Cubic-bezier",
        lien: "https://cubic-bezier.com/#.17,.67,.83,.67",
        description: "Outil de génération de fonction cubic-bezier avec visualisation en live."
      },
      {
        nom: "Easings",
        lien: "https://easings.net/",
        description: "Visualisation live des timings existants par défaut en CSS."
      },
      {
        nom: "CSS selecteurs",
        lien: "https://gist.github.com/magicznyleszek/809a69dd05e1d5f12d01",
        description: "Une fiche mémo (en Anglais) des principaux sélecteurs CSS à connaitre."
      },
      {
        nom: "Autoprefixer",
        lien: "https://autoprefixer.github.io/",
        description: "Donnez votre code CSS, cet outil vous le rendra avec tous les préfixs nécessaires pour que votre code s'exécute correctement dans tous les navigateurs web."
      },
      {
        nom: "CSS clip-path maker",
        lien: "https://bennettfeely.com/clippy/",
        description: "Outil très facile d'utilisation pour créer des formes en CSS en clip-path."
      },
      {
        nom: "Neumorphism.io",
        lien: "https://neumorphism.io/#55b9f3",
        description: "Générateur de code pour un style 'Neumorphism' très simple d'utilisation et personnalisable."
      },
      {
        nom: "CSS Menu Maker",
        lien: "http://cssmenumaker.com/",
        description: "Créer votre menu facilement, cet outils vous génèrera le code associé. Pratique pour débuter !"
      },
      {
        nom: "CSS Generator",
        lien: "https://webcode.tools/css-generator/",
        description: "Une grande banque de ressources de code CSS très visuelle. Idéale pour apprendre ou comprendre rapidement une propriété."
      },
    ]
  },
  {
    title: "Inspiration",
    id: "inspiration",
    note: "En panne d'inspiration ? Jetez un oeil par ici !",
    ressources: [
      {
        nom: "Dribble",
        lien: "https://dribbble.com/",
        description: "Enormément d'éléments graphiques proposés par des designers."
      },
      {
        nom: "Call To Idea",
        lien: "https://www.calltoidea.com/",
        description: "Un superbe site web qui vous propose des composants graphiques classés en catégories."
      },
      {
        nom: "Collect UI",
        lien: "https://collectui.com/",
        description: "Immense collection d'éléments design classés en catégories. Vous y trouverez un peu de tout."
      },
      {
        nom: "Land-Book",
        lien: "https://land-book.com/",
        description: "Présentation de maquettes de sites web."
      },
      {
        nom: "One Page Love",
        lien: "https://onepagelove.com/",
        description: "Des sites Web en une page, avec templates et ressources. "
      },
      {
        nom: "Site Inspire",
        lien: "https://www.siteinspire.com/",
        description: "Vous y trouverez des éléments graphiques et des maquettes pour sites web."
      },
      {
        nom: "Media Queries",
        lien: "https://mediaqueri.es/",
        description: "Propose des sites Web responsives. Vous pouvez acheter les templates, mais rien que de les visualiser peut donner de l'inspiration ;) "
      },
      {
        nom: "Codrops",
        lien: "https://tympanus.net/codrops/",
        description: "Blog autour du design et des éléments graphiques. Vous y trouverez un peu de tout."
      },


    ]
  },
  // {
  //   title: "",
  //   id: "",
  //   note: "",
  //   ressources: [
  //     {
  //       nom: "",
  //       lien: "",
  //       description: ""
  //     },
  //     {
  //       nom: "",
  //       lien: "",
  //       description: ""
  //     },
  //     {
  //       nom: "",
  //       lien: "",
  //       description: ""
  //     },
  //     {
  //       nom: "",
  //       lien: "",
  //       description: ""
  //     },
  //     {
  //       nom: "",
  //       lien: "",
  //       description: ""
  //     },
  //   ]
  // },
]