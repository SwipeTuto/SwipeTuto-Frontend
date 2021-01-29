import React from "react";
import { topicArray } from "../../helper/functions/getTopicsArray";

const CFormFavourites = () => {
  return (
    <div className="CFormFavourites form-step">
      <h2>Afin de vous proposer du contenu personnalisé, merci de choisir votre thème préféré :</h2>
      <div className="CFormFavourites__topics">
        {topicArray?.map((topic) => (
          <div className="CFormFavourites__topics">{topic?.name}</div>
        ))}
      </div>
    </div>
  );
};

export default CFormFavourites;
