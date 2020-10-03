import React from "react";
import "./ContactUsPage.scss";
const ContactUsPage = () => {
  return (
    <div className="ContactPage">
      <h1 className="title title-1">Nous contacter</h1>
      <p>
        Vous souhaitez prendre contact avec nous ? Merci de préciser votre
        adresse mail pour que nous puissions vous répondre, ainsi que la
        catégorie de votre message et un texte descriptif. Merci d'être le plus
        précis possible dans votre message afin que nous puissions y répondre au
        mieux.
      </p>
      <p>
        Par exemple, si vous souhaitez reporter un bug, essayez d'expliquer en
        détail quelles ont été vos actions sur le site web qui ont amenées à
        l'apparition de ce bug. S'il s'agit d'un bug sur une page en
        particulier, vous pouvez fournir l'URL de cette page.
      </p>

      <form className="ContactPage__form">
        <div className="form__group">
          <label htmlFor="contact__email" className="form__label">
            Votre adresse mail (obligatoire pour avoir une réponse) :
          </label>
          <input
            type="email"
            className="form__input"
            id="contact__email"
            name="contact__email"
          />
        </div>
        <div className="form__group">
          <label htmlFor="contact__category" className="form__label">
            Catégorie de votre message :
          </label>
          <select
            name="contact__category"
            id="contact__category"
            className="form__input"
          >
            <option value="">-- Choisir une catégorie --</option>
            <option value="question">Question</option>
            <option value="signal">Signalement</option>
            <option value="recommandation">Recommandation</option>
            <option value="bug">Bug</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div className="form__group">
          <label htmlFor="contact__message" className="form__label">
            Votre message (soyez précis et complet !) :
          </label>
          <textarea
            name="contact__message"
            id="contact__message"
            className="form__input"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default ContactUsPage;
