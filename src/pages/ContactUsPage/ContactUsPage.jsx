import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormInput from "../../components/FormInputs/FormInput";
import FormSelect from "../../components/FormInputs/FormSelect";
import FormTextarea from "../../components/FormInputs/FormTextarea";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import "./ContactUsPage.scss";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { sendEmailContact } from "../../services/backOfficeService.js";
// import  CSRFToken  from "../../components/Cookies/CsrfToken"
import { withRouter } from "react-router-dom";

const ContactUsPage = ({ history }) => {
  const [message, setMessage] = useState({
    email: "",
    category: "",
    description: "",
  });
  const currentUser = useSelector(selectCurrentUser);
  const currentUserEmail = currentUser && currentUser.email;

  useEffect(() => {
    if (message.email === "") {
      setMessage({ ...message, email: currentUserEmail });
    }
  }, [currentUserEmail, message]);

  if (window.scrollY) {
    window.scroll(0, 0);
  }

  const getValue = (name, value) => {
    // console.log(name, value);
    const messageCopy = { ...message, [name]: value };
    setMessage(messageCopy);
  };

  useEffect(() => {
    console.log(message);
  }, [message]);

  const handleMessageSubmit = (e) => {
    const feedbackEl = document.querySelector(".ContactPage__feedback");
    e.preventDefault();
    sendEmailContact(message).then((rep) => {
      if (rep && rep.status && rep.status >= 200 && rep.status < 300) {
        console.log("VICTOIRE");
        feedbackEl.textContent = "Votre message a bien été envoyé, merci. Vous allez être redirigé.";
        setTimeout(() => {
          history.push("/search", history.location);
          history.go();
        }, 3000);
      } else {
        feedbackEl.textContent = "Une erreur s'est produite. Merci de réessayer.";
      }
    });
  };

  return (
    <div className="ContactPage">
      <h1 className="title title-1">Nous contacter</h1>
      <p>
        Vous souhaitez prendre contact avec nous ? Merci de préciser votre adresse mail pour que nous puissions vous répondre, ainsi que la catégorie
        de votre message et un texte descriptif. Merci d'être le plus précis possible dans votre message afin que nous puissions y répondre au mieux.
      </p>
      <p>
        Par exemple, si vous souhaitez reporter un bug, essayez d'expliquer en détail quelles ont été vos actions sur le site web qui ont amenées à
        l'apparition de ce bug. S'il s'agit d'un bug sur une page en particulier, vous pouvez fournir l'URL de cette page.
      </p>

      <form className="ContactPage__form" onSubmit={(e) => handleMessageSubmit(e)}>
        <div className="form__group">
          <FormInput
            idFor="email"
            label="Votre adresse mail (obligatoire pour avoir une réponse) :"
            type="email"
            name="email"
            getValue={getValue}
            required={true}
            firstValue={currentUserEmail && currentUserEmail}
          />
        </div>
        <div className="form__group">
          <FormSelect idFor="category" label="Catégorie de votre message :" name="category" getValue={getValue} firstValue={message?.category}>
            <option value="question">Question</option>
            <option value="signal">Signalement</option>
            <option value="recommandation">Recommandation</option>
            <option value="bug">Bug</option>
            <option value="autre">Autre</option>
          </FormSelect>
        </div>
        <div className="form__group">
          <FormTextarea idFor="description" label="Votre message :" type="text" name="description" getValue={getValue} required={true} />
        </div>

        <CustomButton color="dark">Envoyer</CustomButton>
        <p className="ContactPage__feedback"></p>
      </form>
    </div>
  );
};

export default withRouter(ContactUsPage);
