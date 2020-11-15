import React, { useEffect, useState } from "react";
import FormInput from "../../components/FormInputs/FormInput";
import FormSelect from "../../components/FormInputs/FormSelect";
import FormTextarea from "../../components/FormInputs/FormTextarea";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import { getCategoriesArray, topicArray } from "../../helper";

import "./AddCardPage.scss";

const AddCardPage = () => {
  const [cardInfos, setCardInfos] = useState({
    card_title: "",
    card_description: "",
    card_topic: null,
    card_category: null,
  });
  const [categoriesLocalArray, setCategoriesLocalArray] = useState([]);

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
    console.log(cardInfos);
  }, [cardInfos]);

  const getValue = (name, value) => {
    if (!name || !value) return;
    const cardInfosCopy = { ...cardInfos, [name]: value };
    setCardInfos(cardInfosCopy);
  };

  return (
    <div className="AddCardPage">
      <div className="AddCardPage__wrapper">
        <h1 className="title title-1">Ajouter une carte</h1>
        <section className="AddCardPage__section">
          <h2 className="title title-2">Images</h2>
          <p className="AddCardPage__description">Ajouter les images de votre carte ici.</p>
          <div className="AddCardPage__inputZone">DRAG N DROP</div>
        </section>
        <section className="AddCardPage__section">
          <h2 className="title title-2">Informations</h2>
          <p className="AddCardPage__description">Précisez le titre de votre carte ainsi qu'une description.</p>
          <div className="AddCardPage__inputZone">
            <FormInput idFor="card_title" label="Titre :" type="text" name="card_title" getValue={getValue} required={true} />
          </div>
          <div className="AddCardPage__inputZone">
            <FormTextarea idFor="card_description" label="Description :" name="card_description" type="text" getValue={getValue} required={true} />
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
      </div>
      <div className="AddCardPage__buttons">
        <CustomButton color="white">Enregistrer en brouillon</CustomButton>
        <CustomButton>Publier la carte</CustomButton>
      </div>
    </div>
  );
};

export default AddCardPage;
