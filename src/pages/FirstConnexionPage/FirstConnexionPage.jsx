import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../redux/layout/layout-selectors";
import AFormReglement from "../../components/FirstConnexionForm/AFormReglement";
import BFormPolicy from "../../components/FirstConnexionForm/BFormPolicy";
import CFormFavourites from "../../components/FirstConnexionForm/CFormFavourites";

import "./FirstConnexionPage.scss";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import { Link, withRouter } from "react-router-dom";
import { logoutAction, rulesAcceptedAction } from "../../redux/user/user-actions";

const FirstConnexionPage = ({ history, withPref }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [stepIsOk, setStepIsOk] = useState(false);
  const currentTheme = useSelector(selectTheme);

  const handleNextStep = () => {
    setStep(step + 1);
    if (step + 1 === 3) return;
    setStepIsOk(false);
  };
  const handlePreviousStep = () => {
    setStep(step - 1);
    setStepIsOk(false);
  };
  const handleValidate = () => {
    // action validate update state user et redirect vers homepage ou search
    dispatch(rulesAcceptedAction(history));
    history.push("/");
  };

  const handleQuit = () => {
    dispatch(logoutAction());
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
        {withPref && step === 3 && <CFormFavourites />}
        <div className="FirstConnexionPage__input">
          {step === 1 ? (
            <>
              <div className="FirstConnexionPage__formGroup">
                <input type="radio" name="AForm" value="reglement-accepted" onChange={() => setStepIsOk(true)} id="AForm-accept" checked={stepIsOk} />
                <label htmlFor="AForm-accept">Je reconnais avoir lu et accepté le règlement.</label>
              </div>
              <div className="FirstConnexionPage__formGroup">
                <input type="radio" name="AForm" value="reglement-denied" id="AForm-deny" onChange={() => setStepIsOk(false)} />
                <label htmlFor="AForm-deny">Je n'accepte pas le règlement.</label>
              </div>
            </>
          ) : step === 2 ? (
            <>
              <div className="FirstConnexionPage__formGroup">
                <input type="radio" name="BForm" value="reglement-accepted" id="BForm-accept" onChange={() => setStepIsOk(true)} checked={stepIsOk} />
                <label htmlFor="BForm-accept">Je reconnais avoir lu et accepté la politique de confidentialité et de gestion des données.</label>
              </div>
              <div className="FirstConnexionPage__formGroup">
                <input type="radio" name="BForm" value="reglement-denied" id="BForm-deny" onChange={() => setStepIsOk(false)} />
                <label htmlFor="BForm-deny">Je n'accepte pas la politique de confidentialité et de gestion des données.</label>
              </div>
            </>
          ) : (
            ""
          )}
          {!stepIsOk ? <p className="error__message">Vous devez accepter pour continuer.</p> : <p>&nbsp;</p>}
        </div>
        <div className="FirstConnexionPage__nav">
          {step > 1 && <CustomButton onClick={() => handlePreviousStep()}>&larr; Précédent</CustomButton>}
          <p>Etape {step}</p>
          {step < 3 &&
            (stepIsOk ? (
              <CustomButton onClick={() => handleNextStep()}>Suivant &rarr;</CustomButton>
            ) : (
              <CustomButton color="light" onClick={() => handleQuit()}>
                Quitter l'inscription
              </CustomButton>
            ))}
          {(!withPref && step === 2) || (withPref && step === 3) ? <CustomButton onClick={() => handleValidate()}>Valider</CustomButton> : null}
        </div>
      </div>
    </div>
  );
};

export default withRouter(FirstConnexionPage);
