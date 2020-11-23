import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import FormInput from "../../components/FormInputs/FormInput";
import FormSelect from "../../components/FormInputs/FormSelect";
import FormTextarea from "../../components/FormInputs/FormTextarea";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import DraggableUploadInput from "../../components/LayoutComponents/DraggableUploadInput/DraggableUploadInput";
import { getCategoriesArray, topicArray } from "../../helper";
import { selectCurrentUserId } from "../../redux/user/user-selectors";
import { createCardService } from "../../services/cardsService";

import "./AddCardPage.scss";

const AddCardPage = () => {
  const currentuserId = useSelector(selectCurrentUserId);
  const [cardInfos, setCardInfos] = useState({
    card_title: "",
    card_description: "",
    card_topic: null,
    card_category: null,
  });
  const [initLocalStorageInfos, setInitLocalStorageInfos] = useState({
    card_title: "",
    card_description: "",
    card_topic: null,
    card_category: null,
  });
  const [categoriesLocalArray, setCategoriesLocalArray] = useState([]);
  const [imagesArray, setImagesArray] = useState([]);
  const [imagesArrayNotEmpty, setImagesArrayNotEmpty] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [firstLoadDone, setFirstLoadDone] = useState(false);
  const filedrop = useRef();

  useEffect(() => {
    if (imagesArrayNotEmpty && cardInfos.card_title !== "" && cardInfos.card_description !== "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [cardInfos, cardInfos.card_description, cardInfos.card_title, imagesArrayNotEmpty, isValid]);

  useEffect(() => {
    if (window.scrollY) {
      window.scroll(0, 0);
    }
  }, []);

  useEffect(() => {
    setCategoriesLocalArray(getCategoriesArray(cardInfos.card_topic));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardInfos.card_topic]);

  useEffect(() => {
    // console.log(cardInfos);
  }, [cardInfos]);

  const getValue = (name, value) => {
    if (!name) return;
    const cardInfosCopy = { ...cardInfos, [name]: value };
    setCardInfos(cardInfosCopy);
  };

  const updateFiles = (isFiles, cards) => {
    setImagesArrayNotEmpty(isFiles);
    setImagesArray(cards);
    // const localObj = window.localStorage.getItem("draftNewCard");
  };

  useEffect(() => {
    if (firstLoadDone) {
      window.localStorage.setItem(
        "draftNewCard",
        JSON.stringify({
          name: cardInfos.card_title,
          description: cardInfos.card_description,
          topic: cardInfos.card_topic,
          categorie: cardInfos.card_category,
          user: currentuserId,
          image: imagesArray,
        })
      );
      console.log("overwrite");
    }
  }, [cardInfos.card_category, cardInfos.card_description, cardInfos.card_title, cardInfos.card_topic, currentuserId, firstLoadDone, imagesArray]);

  useEffect(() => {
    if (window.localStorage.getItem("draftNewCard")) {
      const localDraftNewCard = window.localStorage.getItem("draftNewCard");
      console.log(localDraftNewCard);
      setInitLocalStorageInfos({
        card_title: localDraftNewCard.name,
        card_description: localDraftNewCard.description,
        card_topic: localDraftNewCard.topic,
        card_category: localDraftNewCard.categorie,
      });
      // setCardInfos({
      //   card_title: localDraftNewCard.name,
      //   card_description: localDraftNewCard.description,
      //   card_topic: localDraftNewCard.topic,
      //   card_category: localDraftNewCard.categorie,
      // });
    }
    setFirstLoadDone(true);
  }, []);

  const createCard = async () => {
    try {
      const files = await filedrop.current.getFiles();
      console.log('files', files)
      const imagesFiles = await files.map((obj) => obj);
      console.log('obj', imagesFiles)
      setImagesArray(files);
      const cardObject = {
        name: cardInfos.card_title,
        description: cardInfos.card_description,
        topic: cardInfos.card_topic,
        categorie: cardInfos.card_category,
        user: currentuserId,
        image: await imagesFiles,
      };
      createCardService(cardObject);
      setIsValid(false);
    } catch (err) {
    }
  };

  return (
    <div className="AddCardPage">
      <div className="AddCardPage__wrapper">
        <h1 className="title title-1">Ajouter une carte</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <section className="AddCardPage__section">
            <h2 className="title title-2">Images</h2>
            <p className="AddCardPage__description">
              Ajouter la / les image(s) de votre carte ici <sup>(*)</sup>.
            </p>
            <DraggableUploadInput ref={filedrop} updateFiles={updateFiles} />
          </section>

          <section className="AddCardPage__section">
            <h2 className="title title-2">Informations</h2>
            <p className="AddCardPage__description">Précisez le titre de votre carte ainsi qu'une description.</p>
            <div className="AddCardPage__inputZone">
              <FormInput
                idFor="card_title"
                label={
                  <span>
                    Titre <sup>(*)</sup> :
                  </span>
                }
                type="text"
                name="card_title"
                getValue={getValue}
                required={true}
              />
            </div>
            <div className="AddCardPage__inputZone">
              <FormTextarea
                idFor="card_description"
                label={
                  <span>
                    Description <sup>(*)</sup> :
                  </span>
                }
                name="card_description"
                type="text"
                getValue={getValue}
                required={true}
              />
            </div>
          </section>
          <section className="AddCardPage__section">
            <h2 className="title title-2">Classement</h2>
            <p className="AddCardPage__description">
              Afin d'aider les autres utilisateurs à trouver votre carte, veuillez préciser une catégorie et une sous-catégorie pour classer votre
              carte.
            </p>
            <div className="AddCardPage__inputZone">
              <FormSelect idFor="card_topic" label="Catégorie :" name="card_topic" getValue={getValue}>
                {topicArray && topicArray.map((topic) => <option value={topic.queryName}>{topic.name}</option>)}
              </FormSelect>
            </div>
            <div className="AddCardPage__inputZone">
              <FormSelect idFor="card_category" label="Sous-catégorie :" name="card_category" getValue={getValue}>
                {categoriesLocalArray && categoriesLocalArray.map((category) => <option value={category.queryName}>{category.name}</option>)}
              </FormSelect>
            </div>
          </section>
          <div className="AddCardPage__buttons">
            {!isValid && <p className="AddCardPage__error">Veuillez compléter tous les champs (*) avant de pouvoir publier votre carte.</p>}

            <CustomButton type="submit" disabled={!isValid} onClick={() => createCard()}>
              Publier la carte
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardPage;
