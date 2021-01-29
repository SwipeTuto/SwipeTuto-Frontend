import React from "react";

import "./HowItWorks.scss";

const HowItWorks = () => {
  return (
    <div className="HowItWorks">
      <h2 className="title title-2">Le concept Swipetuto</h2>
      <p>Swipetuto, c'est apprendre rapidement une tonne de contenu du bout des doigts !</p>
      <p>
        Vous pourrez trouver des cartes réparties dans plusieurs catégories et sous-catégories pour vous faciliter la recherche. De plus, vous pourrez
        trier les cartes pour accéder encore plus rapidement au contenu qui vous intéresse !
      </p>
      <p>
        Swipetuto est basé sur la création de carte. Chaque carte représente à elle seule un tutoriel. Elles sont composées des éléments suivants :
      </p>
      <ul>
        <li>Un carousel d'images pour afficher l'information le plus visuellement possible</li>
        <li>Un descriptif permettant d'accompagner l'explication des images</li>
        <li>Une section commentaire pour échanger sur le tutoriel</li>
      </ul>
      <p>
        Vous êtes fan d'un tutoriel ? Montrez-le en cliquant sur "j'aime" (le petit coeur) ! Cela permettra d'indiquer aux autres membres de la
        communeauté que vous avez trouvé ce tutoriel intéressant et qu'il mérite d'être vu.
      </p>
      <p>
        De plus, si vous souhaitez garder un tutoriel à portée de main, il vous suffit de cliquer sur le bouton "enregistrer" : le tutoriel se
        retrouvera dans votre espace personnel, dans la section "enregistrés".
      </p>
      <h2 className="title title-2">Prêt pour apprendre d'une toute nouvelle façon ?</h2>
      <p>3, 2, 1 ... SWIPEZ !</p>
    </div>
  );
};

export default HowItWorks;
