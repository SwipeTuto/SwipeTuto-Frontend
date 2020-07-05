import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CustomButton from "../../../components/LayoutComponents/CustomButton/CustomButton";
import { checkRegexInput, errorMessageToDisplay } from "../../../helper/index";
import { updateUserInfos } from "../../../services/userService";

import "./SettingsPage.scss";
import { selectCurrentUser } from "../../../redux/user/user-selectors";

// créer formData() pour envoyer les infos

const SettingsPage = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const currentUser = useSelector(selectCurrentUser);
  const [newUserInfos, setNewUserInfos] = useState(currentUser);
  const [sendNewInfos, setSendNewInfos] = useState(false);

  useEffect(() => {
    if (sendNewInfos) {
      updateUserInfos(newUserInfos);
      setSendNewInfos(false);
    }
  }, [sendNewInfos]);

  const handleAvatarUpdate = (e) => {
    const newAvatarInput = document.querySelector("#avatar");
    const newAvatarFile = newAvatarInput.files[0];
    let avatarFormData = new FormData();
    avatarFormData.append("avatar", newAvatarFile);
    console.log("avatar change");

    setNewUserInfos({
      ...currentUser,
      profile: { ...currentUser.profile, avatar: avatarFormData },
    });
    // newAvatarInput.value = "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let inputIsOk = checkRegexInput(name, value); //test valeur avec regex, true or false
    const currentInput = document.querySelector(
      `.SettingsPage .settings__form--input[name=${name}]`
    );

    const errorMessage = document.querySelector(
      `.SettingsPage .input__message[data-inputfor=${name}]`
    );
    if (name === "password") {
      setPassword(value);
    }

    if (!inputIsOk) {
      currentInput.classList.remove("valid-input");
      currentInput.classList.add("invalid-input");

      errorMessage.textContent = errorMessageToDisplay(name);
    } else {
      currentInput.classList.remove("invalid-input");
      currentInput.classList.add("valid-input");
      errorMessage.textContent = "";

      switch (name) {
        case "username":
        case "first_name":
        case "last_name":
          setNewUserInfos({ ...currentUser, [name]: value });
          break;
        case "description":
          setNewUserInfos({
            ...currentUser,
            profile: { ...currentUser.profile, [name]: value },
          });
          break;
        default:
          console.log(name, value, "erreur");
      }
    }
  };

  const handleSubmitInput = (e) => {
    e.preventDefault();
    setSendNewInfos(true);
    const { name } = e.target;
    const currentInput = document.querySelector(
      `.SettingsPage .settings__form--input[name=${name}]`
    );
    currentInput.value = "";
  };

  return (
    <div className="SettingsPage">
      <h2 className="title title-2">Changer les informations du compte</h2>
      <div className="allForms">
        <form
          className="form__avatar"
          name="avatar"
          onSubmit={(e) => handleSubmitInput(e)}
          onChange={handleAvatarUpdate}
        >
          <label htmlFor="avatar">
            Changez votre avatar (veuillez choisir une image au format{" "}
            <em>.png</em> ou <em>.jpeg</em>) :
          </label>
          <input
            className="settings__form--input invalid-input"
            onChange={(e) => handleChange(e)}
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            required
          />
          <p className="input__message" data-inputfor="avatar"></p>
          <CustomButton color="dark">Valider</CustomButton>
        </form>
        <form
          className="form__pseudo"
          name="username"
          onSubmit={(e) => handleSubmitInput(e)}
        >
          <label htmlFor="username">Changez votre Pseudo :</label>
          <input
            className="settings__form--input invalid-input"
            type="text"
            id="username"
            name="username"
            onChange={(e) => handleChange(e)}
            required
          />
          <p className="input__message" data-inputfor="username"></p>
          <CustomButton color="dark">Valider</CustomButton>
        </form>
        <form
          className="form__first_name"
          name="first_name"
          onSubmit={(e) => handleSubmitInput(e)}
        >
          <label htmlFor="first_name">Changez votre Prénom :</label>
          <input
            className="settings__form--input invalid-input"
            type="text"
            id="first_name"
            name="first_name"
            onChange={(e) => handleChange(e)}
            required
          />
          <p className="input__message" data-inputfor="first_name"></p>
          <CustomButton color="dark">Valider</CustomButton>
        </form>
        <form
          className="form__last_name"
          name="last_name"
          onSubmit={(e) => handleSubmitInput(e)}
        >
          <label htmlFor="username">Changez votre Nom :</label>
          <input
            className="settings__form--input invalid-input"
            type="text"
            id="last_name"
            name="last_name"
            onChange={(e) => handleChange(e)}
            required
          />
          <p className="input__message" data-inputfor="last_name"></p>
          <CustomButton color="dark">Valider</CustomButton>
        </form>
        <form
          className="form__description"
          onSubmit={(e) => handleSubmitInput(e)}
        >
          <label htmlFor="description">Changez votre description :</label>
          <textarea
            className="settings__form--input invalid-input"
            type="text"
            id="description"
            name="description"
            onChange={(e) => handleChange(e)}
            required
          />
          <p className="input__message" data-inputfor="description"></p>
          <CustomButton color="dark">Valider</CustomButton>
        </form>
        {/* !!! à ajouter dans le back sous profile : les liens vers réseaux sociaux */}
        {/* <form className="form__youtube">
          <label htmlFor="youtube">
            Changez le lien vers votre chaine Youtube :
          </label>
          <input
            className="settings__form--input invalid-input"
            type="text"
            id="youtube"
            name="url"
            onChange={(e) => handleChange(e)}
            required
          />
          <p className="input__message" data-inputfor="url"></p>
          <CustomButton color="dark">Valider</CustomButton>
        </form>
        <form className="form__github">
          <label htmlFor="github">
            Changez le lien vers votre compte Github :
          </label>
          <input
            className="settings__form--input invalid-input"
            type="text"
            id="github"
            name="url"
            onChange={(e) => handleChange(e)}
            required
          />
          <p className="input__message" data-inputfor="url"></p>
          <CustomButton color="dark">Valider</CustomButton>
        </form>
        <form className="form__facebook">
          <label htmlFor="facebook">
            Changez le lien vers votre profil Facebook :
          </label>
          <input
            className="settings__form--input invalid-input"
            type="text"
            id="facebook"
            name="url"
            onChange={(e) => handleChange(e)}
            required
          />
          <p className="input__message" data-inputfor="url"></p>
          <CustomButton color="dark">Valider</CustomButton>
        </form>
        <form className="form__twitter">
          <label htmlFor="twitter">
            Changez le lien vers votre profil Twitter :
          </label>
          <input
            className="settings__form--input invalid-input"
            type="text"
            id="twitter"
            name="url"
            onChange={(e) => handleChange(e)}
            required
          />
          <p className="input__message" data-inputfor="url"></p>
          <CustomButton color="dark">Valider</CustomButton>
        </form>
        <form className="form__mdp">
          <label htmlFor="mdp1">Changez votre mot de passe :</label>
          <input
            className="settings__form--input invalid-input"
            type="password"
            id="mdp1"
            name="password"
            onChange={(e) => handleChange(e)}
            required
          />
          <p className="input__message" data-inputfor="password"></p>
          <label htmlFor="mdp2">Confirmez votre nouveau mot de passe :</label>
          <input
            className={`settings__form--input ${
              passwordConfirmation !== password
                ? "invalid-input"
                : "valid-input"
            }`}
            value={passwordConfirmation || ""}
            type="password"
            id="mdp2"
            name="passwordConfirm"
            onChange={(e) => {
              setPasswordConfirmation(e.target.value);
            }}
            required
          />
          <p className="input__message" data-inputfor="passwordConfirm">
            {passwordConfirmation !== password
              ? "Ce mot de passe ne correspond pas à celui mentionné précédemment."
              : ""}
          </p>
          <CustomButton color="dark">Valider</CustomButton>
        </form> */}
      </div>
    </div>
  );
};

export default SettingsPage;
