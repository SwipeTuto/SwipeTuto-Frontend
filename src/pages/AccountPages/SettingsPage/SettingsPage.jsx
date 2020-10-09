import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../../components/LayoutComponents/CustomButton/CustomButton";

import "./SettingsPage.scss";
import {
  selectCurrentUser,
  selectCurrentUserId,
} from "../../../redux/user/user-selectors";
import {
  getCurrentUserAction,
  updateUserInfosAction,
} from "../../../redux/user/user-actions";
import { selectTheme } from "../../../redux/layout/layout-selectors";
import FormInput from "../../../components/FormInputs/FormInput";
import FormTextarea from "../../../components/FormInputs/FormTextarea";
import { upDateAvatar } from "../../../services/userService";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentUserId = useSelector(selectCurrentUserId);
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
    upDateAvatar(avatarFormData).then((rep) => {
      setInputValid({ ...inputValidCopy, avatar: true });
    });

    setNewUserInfos({
      ...currentUser,
      avatar: [avatarFormData],
    });
  };

  const handleChange = (name, value) => {
    const inputValidCopy = inputValid;
    switch (name) {
      case "username":
      case "first_name":
      case "last_name":
        setNewUserInfos({ ...currentUser, [name]: value });
        setInputValid({ ...inputValidCopy, [name]: true });
        break;
      case "description":
        setNewUserInfos({
          ...currentUser,
          profile: { ...currentUser.profile, [name]: value },
        });
        setInputValid({ ...inputValidCopy, description: true });
        break;
      default:
        return;
    }
  };

  const handleSubmitInput = (e) => {
    e.preventDefault();
    dispatch(updateUserInfosAction(newUserInfos));
    currentUserId && dispatch(getCurrentUserAction(currentUserId));
    setSendNewInfos(true);
  };

  const getValue = (name, value) => {
    handleChange(name, value);
  };

  return (
    <div className={`SettingsPage ${currentTheme}-theme`}>
      <h1 className="title title-1">Changer les informations du compte</h1>
      <div className="allForms">
        <form className="form__avatar form" onChange={handleAvatarUpdate}>
          <div className="form__avatar--left">
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
          </div>

          <CustomButton
            name="avatar"
            onClick={(e) => handleSubmitInput(e)}
            color="dark"
            disabled={inputValid.avatar === false ? "disabled" : ""}
          >
            Valider
          </CustomButton>
        </form>
        <form className="form__pseudo form">
          <div className="form__bottom">
            <FormInput
              idFor="username"
              label="Changez votre Pseudo :"
              type="text"
              name="username"
              getValue={getValue}
              required={true}
              firstValue={currentUser && currentUser.username}
            />
          </div>

          <CustomButton
            name="username"
            onClick={(e) => handleSubmitInput(e)}
            color="dark"
            disabled={inputValid.username === false ? "disabled" : ""}
          >
            Valider
          </CustomButton>
        </form>
        <form className="form__first_name form">
          <div className="form__bottom">
            <FormInput
              idFor="first_name"
              label="Votre nom d'utilisateur :"
              type="text"
              name="first_name"
              getValue={getValue}
              required={true}
              firstValue={currentUser && currentUser.first_name}
            />
          </div>
          <CustomButton
            name="first_name"
            onClick={(e) => handleSubmitInput(e)}
            color="dark"
            disabled={inputValid.first_name === false ? "disabled" : ""}
          >
            Valider
          </CustomButton>
        </form>
        <form className="form__last_name form">
          <div className="form__bottom">
            <FormInput
              idFor="last_name"
              label="Votre nom d'utilisateur :"
              type="text"
              name="last_name"
              getValue={getValue}
              required={true}
              firstValue={currentUser && currentUser.last_name}
            />
          </div>
          <CustomButton
            name="last_name"
            onClick={(e) => handleSubmitInput(e)}
            color="dark"
            disabled={inputValid.last_name === false ? "disabled" : ""}
          >
            Valider
          </CustomButton>
        </form>
        <form className="form__description form">
          <div className="form__bottom">
            <FormTextarea
              idFor="description"
              label="Votre description :"
              type="text"
              name="description"
              getValue={getValue}
              required={true}
              firstValue={
                currentUser &&
                currentUser.profile &&
                currentUser.profile.description
              }
            />
          </div>
          <CustomButton
            name="description"
            onClick={(e) => handleSubmitInput(e)}
            color="dark"
            disabled={inputValid.description === false ? "disabled" : ""}
          >
            Valider
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
