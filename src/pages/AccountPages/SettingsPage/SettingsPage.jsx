import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../../components/LayoutComponents/CustomButton/CustomButton";
import { checkRegexInput, errorMessageToDisplay } from "../../../helper/index";

import "./SettingsPage.scss";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { updateUserInfosAction } from "../../../redux/user/user-actions";
import { selectTheme } from "../../../redux/layout/layout-selectors";
import { upDateAvatar } from "../../../services/userService";

const SettingsPage = () => {
  const dispatch = useDispatch();
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
    avatarFormData.append("avatar", newAvatarFile, newAvatarFile.name);
    upDateAvatar(avatarFormData).then(rep =>{
      console.log('rep', rep)
      setInputValid({ ...inputValidCopy, avatar: true });
    })
    setNewUserInfos({
      ...currentUser,
      avatar: [avatarFormData],
    });
    // setInputValid({ ...inputValidCopy, avatar: true });
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
          console.log(newUserInfos);
          break;
        default:
          return;
      }
    }
  };

  const handleSubmitInput = (e) => {
    e.preventDefault();
    dispatch(updateUserInfosAction(newUserInfos));
    setSendNewInfos(true);
    const { name } = e.target;
    const currentInput = document.querySelector(
      `.SettingsPage .settings__form--input[name=${name}]`
    );
    // console.log(currentInput);
    // currentInput.value = "";
  };

  return (
    <div className={`SettingsPage ${currentTheme}-theme`}>
      <h1 className="title title-1">Changer les informations du compte</h1>
      <div className="allForms">
        <form className="form__avatar form" onChange={handleAvatarUpdate}>
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
        <form className="form__pseudo form">
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
        <form className="form__first_name form">
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
        <form className="form__last_name form">
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
        <form className="form__description form">
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
      </div>
    </div>
  );
};

export default SettingsPage;
