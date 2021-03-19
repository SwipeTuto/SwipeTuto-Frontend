import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../../components/LayoutComponents/CustomButton/CustomButton";

import "./SettingsPage.scss";
import { selectCurrentUser, selectCurrentUserId, selectCurrentUserSettings } from "../../../redux/user/user-selectors";
import { getCurrentUserAction, updateUserInfosAction } from "../../../redux/user/user-actions";
import { selectTheme } from "../../../redux/layout/layout-selectors";
import FormInput from "../../../components/FormInputs/FormInput";
import FormTextarea from "../../../components/FormInputs/FormTextarea";
import { resetPassowrd, upDateAvatar } from "../../../services/userService";
import { openNotificationPopup, setCardsSize, toggleThemeAction } from "../../../redux/layout/layout-actions";
import Loading from "../../../components/Loading/Loading";
import ButtonLoading from "../../../components/Loading/ButtonLoading";
import { setUpdateAvatarButtonLoading } from "../../../redux/loadings/loadings-actions";
import { selectUpdateAvatarLoading } from "../../../redux/loadings/loadings-selectors";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentUserId = useSelector(selectCurrentUserId);
  const currentTheme = useSelector(selectTheme);
  const currentUserSettings = useSelector(selectCurrentUserSettings);
  const updateAvatarLoading = useSelector(selectUpdateAvatarLoading);
  const [newUserInfos, setNewUserInfos] = useState(currentUser);
  const [sendNewInfos, setSendNewInfos] = useState(false);
  const [resetPWLoading, setResetPWLoading] = useState(false);
  const [inputValid, setInputValid] = useState({
    username: false,
    first_name: false,
    last_name: false,
    avatar: false,
    description: false,
  });
  const [userPref, setUserPref] = useState(null);

  useEffect(() => {
    if (currentUserSettings) {
      setUserPref({
        color_theme: currentUser?.settings?.color_theme || "light",
        card_size: currentUser?.settings?.card_size || "small",
      });
      // setCardSizePref(currentUserSettings.card_size);
      // setThemePref(currentUserSettings.color_theme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    dispatch(setUpdateAvatarButtonLoading(true));
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
      dispatch(setUpdateAvatarButtonLoading(false));
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
    dispatch(getCurrentUserAction());
    setSendNewInfos(true);
  };

  const getValue = (name, value) => {
    handleChange(name, value);
  };

  useEffect(() => {
    dispatch(
      updateUserInfosAction({
        ...currentUser,
        settings: {
          ...currentUser.settings,
          color_theme: userPref?.color_theme,
          card_size: userPref?.card_size,
        },
      })
    );
    dispatch(getCurrentUserAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPref]);

  const handleResetPassword = async () => {
    if (currentUser.email) {
      setResetPWLoading(true);
      try {
        await resetPassowrd(currentUser.email);
        dispatch(openNotificationPopup("info", "Un email vous a été envoyé pour changer de mot de passe !"));
        return setResetPWLoading(false);
      } catch (err) {
        return setResetPWLoading(false);
      }
    } else {
      dispatch(openNotificationPopup("error", "Une erreur est survenue. Merci de réessayer plus tard ou de signaler le problème."));
    }
  };

  return (
    <div className={`SettingsPage ${currentTheme}-theme-d`}>
      <h2 className="title title-2">Changer les informations du compte</h2>
      <div className="allForms">
        <form className="form__color-theme form">
          <div className="form__bottom">
            <p className="FormInput__label">Préférence des couleurs du thème :</p>
            <div className="form__options">
              <input
                type="radio"
                id="light-theme"
                name="color-theme"
                value="light"
                checked={userPref?.color_theme === "light"}
                onChange={() => {
                  // dispatch(toggleThemeAction("light"));
                  setUserPref({ ...userPref, color_theme: "light" });
                }}
              />
              <label htmlFor="light-theme">Thème clair</label>
              <input
                type="radio"
                id="dark-theme"
                name="color-theme"
                value="dark"
                checked={userPref?.color_theme === "dark"}
                onChange={() => {
                  // dispatch(toggleThemeAction("dark"));
                  setUserPref({ ...userPref, color_theme: "dark" });
                }}
              />
              <label htmlFor="dark-theme">Thème sombre</label>
            </div>
          </div>
        </form>
        <form className="form__card-size form">
          <div className="form__bottom">
            <p className="FormInput__label">Préférence de la taille d'affichage des cartes :</p>
            <div className="form__options">
              <input
                type="radio"
                id="small-cards"
                name="card-size"
                value="small"
                checked={userPref?.card_size === "small"}
                onChange={() => {
                  // dispatch(setCardsSize("small"));
                  setUserPref({ ...userPref, card_size: "small" });
                }}
              />
              <label htmlFor="small-cards">Petites cartes</label>
              <input
                type="radio"
                id="big-cards"
                name="card-size"
                value="big"
                checked={userPref?.card_size === "big"}
                onChange={() => {
                  // dispatch(setCardsSize("big"));
                  setUserPref({ ...userPref, card_size: "big" });
                }}
              />
              <label htmlFor="big-cards">Grandes cartes</label>
            </div>
          </div>
        </form>
        <form className="form__avatar form" onChange={handleAvatarUpdate}>
          <div className="form__avatar--left">
            <label htmlFor="avatar">
              Changez votre avatar (veuillez choisir une image au format <em>.png</em> ou <em>.jpeg</em>) :
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

          <CustomButton name="avatar" onClick={(e) => handleSubmitInput(e)} color="dark" disabled={inputValid.avatar === false ? "disabled" : ""}>
            {updateAvatarLoading ? "Chargement..." : "Valider"}
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

          <CustomButton name="username" onClick={(e) => handleSubmitInput(e)} color="dark" disabled={inputValid.username === false ? "disabled" : ""}>
            Valider
          </CustomButton>
        </form>
        <form className="form__first_name form">
          <div className="form__bottom">
            <FormInput
              idFor="first_name"
              label="Votre prénom :"
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
              label="Votre nom :"
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
              firstValue={currentUser && currentUser.profile && currentUser.profile.description}
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
        <div className="form__reset-password form">
          <div className="form__bottom">
            <p>Vous souhaitez changer votre mot de passe ?</p>
            <p>Cliquez sur le bouton ci-contre. Vous recevrez une invitation par mail à votre adresse {currentUser?.email}</p>
          </div>
          <CustomButton name="reset_password" onClick={() => handleResetPassword()} color="dark">
            {resetPWLoading ? <ButtonLoading /> : "Changer de mot de passe"}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
