import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/layout/layout-selectors";
import AFormReglement from "../../components/FirstConnexionForm/AFormReglement";
import BFormPolicy from "../../components/FirstConnexionForm/BFormPolicy";
import CFormFavourites from "../../components/FirstConnexionForm/CFormFavourites";

import "./FirstConnexionPage.scss";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";

const FirstConnexionPage = () => {
  const [step, setStep] = useState(1);
  const currentTheme = useSelector(selectTheme);

  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handlePreviousStep = () => {
    setStep(step - 1);
  };
  const handleValidate = () => {
    setStep(step - 1);
  };

  return (
    <div className={`FirstConnexionPage ${currentTheme}-theme-d`}>
      <h1 className="title title-1">Bienvenue chez Swipetuto !</h1>
      <p>
        Nous sommes très heureux de vous compter parmi nous. Avant de pouvoir découvrir une tonne de contenu, il vous reste quelques étapes pour
        finaliser votre inscription.
      </p>

      <div className={`FirstConnexionPage__form ${currentTheme}-theme-m`}>
        {step === 1 && <AFormReglement />}
        {step === 2 && <BFormPolicy />}
        {step === 3 && <CFormFavourites />}
        <div className="FirstConnexionPage__input">
          {step === 1 ? (
            <>
              <div className="FirstConnexionPage__formGroup">
                <input type="radio" name="AForm" value="reglement-accepted" id="AForm-accept" />
                <label htmlFor="AForm-accept">Je reconnais avoir lu et accepté le règlement.</label>
              </div>
              <div className="FirstConnexionPage__formGroup">
                <input type="radio" name="AForm" value="reglement-denied" id="AForm-deny" />
                <label htmlFor="AForm-deny">Je n'accepte pas le règlement.</label>
              </div>
            </>
          ) : step === 2 ? (
            <>
              <div className="FirstConnexionPage__formGroup">
                <input type="radio" name="BForm" value="reglement-accepted" id="BForm-accept" />
                <label htmlFor="BForm-accept">Je reconnais avoir lu et accepté la politique de confidentialité et de gestion des données.</label>
              </div>
              <div className="FirstConnexionPage__formGroup">
                <input type="radio" name="BForm" value="reglement-denied" id="BForm-deny" />
                <label htmlFor="BForm-deny">Je n'accepte pas la politique de confidentialité et de gestion des données.</label>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="FirstConnexionPage__nav">
          {step > 1 && <CustomButton onClick={() => handlePreviousStep()}>&larr; Précédent</CustomButton>}
          <p>Etape {step} sur 3</p>
          {step < 3 && <CustomButton onClick={() => handleNextStep()}>Suivant &rarr;</CustomButton>}
          {step === 3 && <CustomButton onClick={() => handleValidate()}>Valider</CustomButton>}
        </div>
      </div>
    </div>
  );
};

export default FirstConnexionPage;
