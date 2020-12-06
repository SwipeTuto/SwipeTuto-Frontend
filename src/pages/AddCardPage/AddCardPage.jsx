import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../components/FormInputs/FormInput";
import FormSelect from "../../components/FormInputs/FormSelect";
// import FormTextarea from "../../components/FormInputs/FormTextarea";
import RichTextInput from "../../components/FormInputs/RichTextInput";
// import JoditInput from "../../components/FormInputs/RichTextInput";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import DraggableUploadInput from "../../components/LayoutComponents/DraggableUploadInput/DraggableUploadInput";
import Loading from "../../components/Loading/Loading";
import { getCategoriesArray, topicArray } from "../../helper";
import { createCardAction } from "../../redux/filter/filter-actions";
import { openNotificationPopup } from "../../redux/layout/layout-actions";
import { selectIsLoaded, selectTheme } from "../../redux/layout/layout-selectors";
import { selectCurrentUserId } from "../../redux/user/user-selectors";
// import { createCardService } from "../../services/cardsService";

import "./AddCardPage.scss";

const AddCardPage = () => {
  const currentuserId = useSelector(selectCurrentUserId);
  const [cardInfos, setCardInfos] = useState({
    card_title: "",
    card_description: "",
    card_topic: null,
    card_category: null,
  });
  const currentTheme = useSelector(selectTheme);
  const [categoriesLocalArray, setCategoriesLocalArray] = useState([]);
  // const [imagesArray, setImagesArray] = useState([]);
  const [imagesArrayNotEmpty, setImagesArrayNotEmpty] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [emptyState, setEmptyState] = useState(false);
  const filedrop = useRef();
  const localDraftNewCard = JSON.parse(window.localStorage.getItem("draftNewCard"));
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
    if (window.scrollY) {
      window.scroll(0, 0);
    }
  }, []);

  useEffect(() => {
    setCategoriesLocalArray(getCategoriesArray(cardInfos.card_topic));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardInfos.card_topic]);

  const getValue = (name, value) => {
    if (!name) return;
    // setEmptyState(false);
    const cardInfosCopy = { ...cardInfos, [name]: value };
    setCardInfos(cardInfosCopy);
  };

  const getDescriptionValue = (description) => {
    if (!description) return;
    // console.log(description);
    const cardInfosCopy = { ...cardInfos, card_description: description };
    // console.log(cardInfosCopy);
    setCardInfos(cardInfosCopy);
  };

  const updateFiles = (isFiles, cards) => {
    setImagesArrayNotEmpty(isFiles);
    // setImagesArray(cards);
    // const localObj = window.localStorage.getItem("draftNewCard");
  };

  useEffect(() => {
    if (localDraftNewCard && localDraftNewCard.user !== currentuserId) {
      handleDeleteCard();
    } else if (localDraftNewCard) {
      setCardInfos({
        card_title: localDraftNewCard.name,
        card_description: localDraftNewCard.description,
        card_topic: localDraftNewCard.topic,
        card_category: localDraftNewCard.categorie,
      });
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
      })
    );
    // console.log({
    //   name: cardInfos.card_title,
    //   description: cardInfos.card_description,
    //   topic: cardInfos.card_topic,
    //   categorie: cardInfos.card_category,
    //   user: currentuserId,
    // });
  }, [cardInfos.card_category, cardInfos.card_description, cardInfos.card_title, cardInfos.card_topic, currentuserId]);

  const createCard = async () => {
    try {
      const files = await filedrop.current.getFiles();
      const imagesFiles = await files.map((obj) => obj);
      const cardObject = {
        name: cardInfos.card_title,
        description: cardInfos.card_description,
        topic: cardInfos.card_topic,
        categorie: cardInfos.card_category,
        user: currentuserId,
        image: await imagesFiles,
      };
      dispatch(createCardAction(cardObject));
      // createCardService(cardObject);
      // createCardService(files);
      await window.localStorage.removeItem("draftNewCard");
      // console.log(cardObject);
      setIsValid(false);
    } catch (err) {}
  };

  const handleDeleteCard = async () => {
    setCardInfos({
      card_title: "",
      card_description: "<p></p>",
      card_topic: null,
      card_category: null,
    });
    await filedrop.current.removeFiles();
    window.localStorage.removeItem("draftNewCard");
    setEmptyState(true);
    document.location.reload();
  };

  // useEffect(() => {
  //   console.log(cardInfos);
  // }, [cardInfos]);

  useEffect(() => {
    if (emptyState) setEmptyState(false);
  }, [emptyState]);

  useEffect(() => {
    if (
      localDraftNewCard &&
      (localDraftNewCard.title ||
        localDraftNewCard.categorie ||
        (localDraftNewCard.description !== "<p></p>↵" && localDraftNewCard.description !== "<p></p>" && localDraftNewCard.description) ||
        (localDraftNewCard.name && localDraftNewCard.name !== "") ||
        localDraftNewCard.topic) &&
      localDraftNewCard.user === currentuserId
    ) {
      dispatch(
        openNotificationPopup(
          'Un brouillon de carte a été trouvé. Merci de rajouter vos images pour compléter la carte, ou cliquer sur "Effacer la carte" pour vider tous les champs'
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className={`AddCardPage ${currentTheme}-theme-d`}>
      {!isLoaded && (
        <div className="AddCardPage__loading">
          <Loading />
        </div>
      )}
      {/* <div className="AddCardPage__loading">
        <Loading />
      </div> */}
      <div className="AddCardPage__wrapper">
        <h1 className="title title-1">Ajouter une carte</h1>
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
              {/* <FormTextarea
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
                firstValue={cardInfos.card_description || ""}
              /> */}
              <RichTextInput
                label={<span>Description :</span>}
                getDescriptionValue={getDescriptionValue}
                firstValue={(localDraftNewCard && localDraftNewCard.description) || "<p></p>"}
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
                  topicArray.map((topic, index) => (
                    <option value={topic.queryName} key={`topicAdd${topic.name}${index}`}>
                      {topic.name}
                    </option>
                  ))}
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
                  categoriesLocalArray.map((category, index) => (
                    <option value={category.queryName} key={`categoryAdd${category.name}${index}`}>
                      {category.name}
                    </option>
                  ))}
              </FormSelect>
            </div>
          </section>
          <div className="AddCardPage__action">
            {!isValid && <p className="AddCardPage__error">Veuillez compléter tous les champs (*) avant de pouvoir publier votre carte.</p>}

            <div className="AddCardPage__buttons">
              <CustomButton color="white" type="button" onClick={() => handleDeleteCard()}>
                Effacer la carte
              </CustomButton>
              <CustomButton type="submit" disabled={!isValid} onClick={() => createCard()}>
                Publier la carte
              </CustomButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardPage;
