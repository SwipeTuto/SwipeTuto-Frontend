import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../../components/LayoutComponents/CustomButton/CustomButton";
import { checkRegexInput, errorMessageToDisplay } from "../../../helper/index";
// import { updateUserInfos } from "../../../services/userService";

import "./SettingsPage.scss";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { updateUserInfosAction } from "../../../redux/user/user-actions";
import { selectTheme } from "../../../redux/layout/layout-selectors";

// créer formData() pour envoyer les infos

const SettingsPage = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const currentUser = useSelector(selectCurrentUser);
  const currentTheme = useSelector(selectTheme);
  const [newUserInfos, setNewUserInfos] = useState(currentUser);
  const [sendNewInfos, setSendNewInfos] = useState(false);
  const [inputValid, setInputValid] = useState({
    username: false,
    first_name: false,
    last_name: false,
    avatar: false,
    description: false,
  });

  useEffect(() => {
    if (sendNewInfos) {
      setSendNewInfos(false);
    }
    setInputValid({
      username: false,
      first_name: false,
      last_name: false,
      avatar: false,
      description: false,
    });
  }, [sendNewInfos]);

  const handleAvatarUpdate = (e) => {
    const inputValidCopy = inputValid;
    const newAvatarInput = document.querySelector("#avatar");
    const newAvatarFile = newAvatarInput.files[0];
    if (!newAvatarFile) {
      setInputValid({ ...inputValidCopy, avatar: false });
    }
    let avatarFormData = new FormData();
    avatarFormData.append("avatar", newAvatarFile);

    setNewUserInfos({
      ...currentUser,
      avatar: [avatarFormData],
    });
    setInputValid({ ...inputValidCopy, avatar: true });
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
      errorMessage.classList.add("error__message");
      errorMessage.textContent = errorMessageToDisplay(name);
      const inputValidCopy = inputValid;
      setInputValid({ ...inputValidCopy, [name]: false });
    } else {
      currentInput.classList.remove("invalid-input");
      currentInput.classList.add("valid-input");
      errorMessage.classList.remove("error__message");
      errorMessage.textContent = "";

      const inputValidCopy = inputValid;
      setInputValid({ ...inputValidCopy, [name]: true });

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
          return;
      }
    }
  };
  // hello

  const handleSubmitInput = (e) => {
    e.preventDefault();
    console.log(newUserInfos);
    dispatch(updateUserInfosAction(newUserInfos));
    setSendNewInfos(true);
    const { name } = e.target;
    const currentInput = document.querySelector(`input[name=${name}]`);
    currentInput.value = "";
  };

  return (
    <div className={`SettingsPage ${currentTheme}-theme`}>
      <h1 className="title title-1">Changer les informations du compte</h1>
      <div className="allForms">
        <form
          className="form__avatar form"
          // name="avatar"
          // onSubmit={(e) => handleSubmitInput(e)}
          onChange={handleAvatarUpdate}
        >
          <label htmlFor="avatar">
            Changez votre avatar (veuillez choisir une image au format{" "}
            <em>.png</em> ou <em>.jpeg</em>) :
          </label>
          <div className="form__bottom">
            <div className="form__bottom--input">
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
            </div>
            <CustomButton
              name="avatar"
              onClick={(e) => handleSubmitInput(e)}
              color="dark"
              disabled={inputValid.avatar === false ? "disabled" : ""}
            >
              Valider
            </CustomButton>
          </div>
        </form>
        <form
          className="form__pseudo form"
          // name="username"
          // onSubmit={(e) => handleSubmitInput(e)}
        >
          <label htmlFor="username">Changez votre Pseudo :</label>
          <div className="form__bottom">
            <div className="form__bottom--input">
              <input
                className="settings__form--input invalid-input"
                type="text"
                id="username"
                name="username"
                onChange={(e) => handleChange(e)}
                placeholder={currentUser && currentUser.username}
                required
              />
              <p className="input__message" data-inputfor="username"></p>
            </div>
            <CustomButton
              name="username"
              onClick={(e) => handleSubmitInput(e)}
              color="dark"
              disabled={inputValid.username === false ? "disabled" : ""}
            >
              Valider
            </CustomButton>
          </div>
        </form>
        <form
          className="form__first_name form"
          // name="first_name"
          // onSubmit={(e) => handleSubmitInput(e)}
        >
          <label htmlFor="first_name">Changez votre Prénom :</label>
          <div className="form__bottom">
            <div className="form__bottom--input">
              <input
                className="settings__form--input invalid-input"
                type="text"
                id="first_name"
                name="first_name"
                onChange={(e) => handleChange(e)}
                placeholder={currentUser && currentUser.first_name}
                required
              />
              <p className="input__message" data-inputfor="first_name"></p>
            </div>
            <CustomButton
              name="first_name"
              onClick={(e) => handleSubmitInput(e)}
              color="dark"
              disabled={inputValid.first_name === false ? "disabled" : ""}
            >
              Valider
            </CustomButton>
          </div>
        </form>
        <form
          className="form__last_name form"
          // name="last_name"
          // onSubmit={(e) => handleSubmitInput(e)}
        >
          <label htmlFor="last_name">Changez votre Nom :</label>
          <div className="form__bottom">
            <div className="form__bottom--input">
              <input
                className="settings__form--input invalid-input"
                type="text"
                id="last_name"
                name="last_name"
                onChange={(e) => handleChange(e)}
                placeholder={currentUser && currentUser.last_name}
                required
              />
              <p className="input__message" data-inputfor="last_name"></p>
            </div>
            <CustomButton
              name="last_name"
              onClick={(e) => handleSubmitInput(e)}
              color="dark"
              disabled={inputValid.last_name === false ? "disabled" : ""}
            >
              Valider
            </CustomButton>
          </div>
        </form>
        <form
          className="form__description form"
          // name="description"
          // onSubmit={(e) => handleSubmitInput(e)}
        >
          <label htmlFor="description">Changez votre description :</label>
          <div className="form__bottom">
            <div className="form__bottom--input">
              <textarea
                className="settings__form--input invalid-input"
                type="text"
                id="description"
                name="description"
                onChange={(e) => handleChange(e)}
                placeholder={
                  currentUser &&
                  currentUser.profile &&
                  currentUser.profile.description
                }
                onFocus={() =>
                  setInputValid({ ...inputValid, description: true })
                }
              />
              <p className="input__message" data-inputfor="description"></p>
            </div>
            <CustomButton
              name="description"
              onClick={(e) => handleSubmitInput(e)}
              color="dark"
              disabled={inputValid.description === false ? "disabled" : ""}
            >
              Valider
            </CustomButton>
          </div>
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
