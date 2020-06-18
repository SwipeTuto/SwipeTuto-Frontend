import React from "react";
import CustomButton from "../../../components/LayoutComponents/CustomButton/CustomButton";

import "./SettingsPage.scss";

// créer formData() pour envoyer les infos

const SettingsPage = () => {
  const handleFileSumbit = (e) => {
    e.preventDefault();
    const newAvatarForm = document.querySelector(".form__avatar");
    let formData = new FormData(newAvatarForm);
    console.log(formData);
    // envoyer formData au serveur
  };

  return (
    <div className="SettingsPage">
      <h1 className="title title-1">Changer les informations du compte</h1>
      <div className="allForms">
        <form className="form__avatar" onSubmit={handleFileSumbit}>
          <label htmlFor="avatar">
            Changez votre avatar (veuillez choisir une image au format{" "}
            <em>.png</em> ou <em>.jpeg</em>) :
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            required
          />
          <CustomButton color="dark">Valider</CustomButton>
        </form>
        <form className="form__pseudo">
          <label htmlFor="pseudo">Changez votre pseudo :</label>
          <input type="text" id="pseudo" name="pseudo" required />
          <CustomButton color="dark">Valider</CustomButton>
        </form>
        <form className="form__bio">
          <label htmlFor="bio">Changez votre bio :</label>
          <textarea type="text" id="bio" name="bio" required />
          <CustomButton color="dark">Valider</CustomButton>
        </form>
        <form className="form__youtube">
          <label htmlFor="youtube">
            Changez le lien vers votre chaine Youtube :
          </label>
          <input type="text" id="youtube" name="youtube" required />
          <CustomButton color="dark">Valider</CustomButton>
        </form>
        <form className="form__github">
          <label htmlFor="github">
            Changez le lien vers votre compte Github :
          </label>
          <input type="text" id="github" name="github" required />
          <CustomButton color="dark">Valider</CustomButton>
        </form>
        <form className="form__facebook">
          <label htmlFor="facebook">
            Changez le lien vers votre profil Facebook :
          </label>
          <input type="text" id="facebook" name="facebook" required />
          <CustomButton color="dark">Valider</CustomButton>
        </form>
        <form className="form__twitter">
          <label htmlFor="twitter">
            Changez le lien vers votre profil Twitter :
          </label>
          <input type="text" id="twitter" name="twitter" required />
          <CustomButton color="dark">Valider</CustomButton>
        </form>
        <form className="form__mdp">
          <label htmlFor="mdp1">Changez votre mot de passe :</label>
          <input type="password" id="mdp1" name="mdp1" required />
          <label htmlFor="mdp2">Confirmez votre nouveau mot de passe :</label>
          <input type="password" id="mdp2" name="mdp2" required />
          <CustomButton color="dark">Valider</CustomButton>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
