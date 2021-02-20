import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import FormInput from "../../../components/FormInputs/FormInput";
import FormSelect from "../../../components/FormInputs/FormSelect";
import RichTextInput from "../../../components/FormInputs/RichTextInput";
import CustomButton from "../../../components/LayoutComponents/CustomButton/CustomButton";
import DraggableUploadInput from "../../../components/LayoutComponents/DraggableUploadInput/DraggableUploadInput";
import Loading from "../../../components/Loading/Loading";
import { getCategoriesArray } from "../../../helper/functions/getCategoriesArray";
import { topicArray } from "../../../helper/functions/getTopicsArray";
import { createCardAction, updateCardAction } from "../../../redux/filter/filter-actions";
import { openNotificationPopup } from "../../../redux/layout/layout-actions";
import { selectIsLoaded, selectTheme } from "../../../redux/layout/layout-selectors";
import { selectCurrentUserId } from "../../../redux/user/user-selectors";

import "./AddCardPage.scss";

const AddCardPage = ({ type, history }) => {
  const localDraftNewCard = JSON.parse(window.localStorage.getItem("draftNewCard"));
  const currentuserId = useSelector(selectCurrentUserId);
  const [cardInfos, setCardInfos] = useState({
    card_title: localDraftNewCard?.name || "",
    card_description: localDraftNewCard?.description || "",
    card_topic: localDraftNewCard?.topic || "technologie",
    card_category: localDraftNewCard?.categorie || null,
    card_images: localDraftNewCard?.images || [],
    card_id: localDraftNewCard?.id || null,
  });
  const currentTheme = useSelector(selectTheme);
  const [categoriesLocalArray, setCategoriesLocalArray] = useState([]);
  const [imagesArrayNotEmpty, setImagesArrayNotEmpty] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [emptyState, setEmptyState] = useState(false);
  const filedrop = useRef();
  const dispatch = useDispatch();
  const isLoaded = useSelector(selectIsLoaded);

  useEffect(() => {
    if (imagesArrayNotEmpty && cardInfos.card_title !== "" && cardInfos.card_description !== "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [cardInfos, cardInfos.card_description, cardInfos.card_title, imagesArrayNotEmpty, isValid]);

  useEffect(() => {
    setCategoriesLocalArray(getCategoriesArray(cardInfos.card_topic));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardInfos.card_topic]);

  const getValue = (name, value) => {
    if (!name) return;
    const cardInfosCopy = { ...cardInfos, [name]: value };
    setCardInfos(cardInfosCopy);
  };

  const getDescriptionValue = (description) => {
    if (!description) return;
    const cardInfosCopy = { ...cardInfos, card_description: description };
    setCardInfos(cardInfosCopy);
  };

  const updateFiles = (isFiles, cards) => {
    setImagesArrayNotEmpty(isFiles);
  };

  useEffect(() => {
    if (localDraftNewCard && localDraftNewCard.user !== currentuserId) {
      handleDeleteCard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "draftNewCard",
      JSON.stringify({
        name: cardInfos.card_title,
        description: cardInfos.card_description,
        topic: cardInfos.card_topic,
        categorie: cardInfos.card_category,
        user: currentuserId,
        images: cardInfos.card_images,
      })
    );
  }, [cardInfos.card_images, cardInfos.card_category, cardInfos.card_description, cardInfos.card_title, cardInfos.card_topic, currentuserId]);

  const createCard = async (state) => {
    try {
      const files = await filedrop.current.getFiles();
      const imagesFiles = await files.map((obj) => obj);
      const cardObject = {
        state: state,
        name: cardInfos.card_title,
        description: cardInfos.card_description,
        topic: cardInfos.card_topic,
        categorie: cardInfos.card_category,
        user: currentuserId,
        image: await imagesFiles,
      };

      await dispatch(createCardAction(cardObject, state));

      await window.localStorage.removeItem("draftNewCard");
      setIsValid(false);
      if (state === 0) history.push("/account/drafts");
    } catch (err) {
      dispatch(openNotificationPopup("error", "Une erreur est survenue. Merci de réessayer."));
      console.log(err);
    }
  };

  const updateCard = async (state) => {
    try {
      const files = await filedrop.current.getFiles();
      const imagesFiles = await files.map((obj) => obj);
      const cardObject = {
        state: state,
        name: cardInfos.card_title,
        description: cardInfos.card_description,
        topic: cardInfos.card_topic,
        categorie: cardInfos.card_category,
        user: currentuserId,
        image: await imagesFiles,
      };

      // faire le update
      await dispatch(updateCardAction(cardInfos?.card_id, cardObject));
      if (state === 0) {
        history.push("/account/drafts");
      } else {
        history.push("/search");
      }

      await window.localStorage.removeItem("draftNewCard");
      setIsValid(false);
    } catch (err) {
      dispatch(openNotificationPopup("error", "Une erreur est survenue. Merci de réessayer."));
      console.log(err);
    }
  };

  const handleDeleteCard = async () => {
    setCardInfos({
      card_title: "",
      card_description: "",
      card_topic: null,
      card_category: null,
      card_images: [],
    });
    await filedrop.current.removeFiles();
    window.localStorage.removeItem("draftNewCard");
    setEmptyState(true);
  };

  useEffect(() => {
    if (emptyState) setEmptyState(false);
  }, [emptyState]);

  return (
    <div className={`AddCardPage ${currentTheme}-theme-d`}>
      {!isLoaded && (
        <div className="AddCardPage__loading">
          <Loading />
        </div>
      )}
      <div className="AddCardPage__wrapper">
        <h2 className="title title-2">Ajouter une carte</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <section className="AddCardPage__section">
            <h2 className="title title-2">Images</h2>
            <p className="AddCardPage__description">
              Ajouter la / les image(s) de votre carte ici <sup>(*)</sup>.
            </p>
            <DraggableUploadInput ref={filedrop} updateFiles={updateFiles} emptyState={emptyState} />
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
                firstValue={cardInfos.card_title || ""}
              />
            </div>
            <div className="AddCardPage__inputZone">
              <RichTextInput
                label={<span>Description :</span>}
                getDescriptionValue={getDescriptionValue}
                firstValue={(cardInfos && cardInfos.card_description) || ""}
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
              <FormSelect
                idFor="card_topic"
                label={
                  <span>
                    Catégorie <sup>(*)</sup> :
                  </span>
                }
                name="card_topic"
                getValue={getValue}
                firstValue={cardInfos.card_topic || null}
              >
                {topicArray &&
                  topicArray.map(
                    (topic, index) =>
                      topic.queryName !== null && (
                        <option value={topic.queryName} key={`topicAdd${topic.name}${index}`}>
                          {topic.name}
                        </option>
                      )
                  )}
              </FormSelect>
            </div>
            <div className="AddCardPage__inputZone">
              <FormSelect
                idFor="card_category"
                label={
                  <span>
                    Sous-catégorie <sup>(*)</sup> :
                  </span>
                }
                name="card_category"
                getValue={getValue}
                firstValue={cardInfos.card_category || null}
              >
                {categoriesLocalArray &&
                  categoriesLocalArray.map(
                    (category, index) =>
                      category.queryName !== null && (
                        <option value={category.queryName} key={`categoryAdd${category.name}${index}`}>
                          {category.name}
                        </option>
                      )
                  )}
              </FormSelect>
            </div>
          </section>
          <div className="AddCardPage__action">
            {!isValid && <p className="AddCardPage__error">Veuillez compléter tous les champs (*) avant de pouvoir publier votre carte.</p>}

            <div className="AddCardPage__buttons">
              <CustomButton color="white" type="button" onClick={() => handleDeleteCard()}>
                Effacer les champs
              </CustomButton>
              {type && type === "modify" ? (
                <>
                  <CustomButton color="white" type="button" onClick={() => updateCard(0)}>
                    Mettre à jour et enregistrer en brouillon
                  </CustomButton>
                  <CustomButton type="submit" disabled={!isValid} onClick={() => updateCard(1)}>
                    Mettre à jour et publier la carte
                  </CustomButton>
                </>
              ) : (
                <>
                  <CustomButton color="white" type="button" onClick={() => createCard(0)}>
                    Enregistrer en brouillon
                  </CustomButton>
                  <CustomButton type="submit" disabled={!isValid} onClick={() => createCard(1)}>
                    Publier la carte
                  </CustomButton>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(AddCardPage);
