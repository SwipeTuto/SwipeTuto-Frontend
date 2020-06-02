// Popup qui s'ouvre au clic sur une card. Contient CardSliderFull et aussi toutes les infos de la card cliquée

import React from "react";

import CardSliderFullCard from "../CardSlider/CardSliderFullCard";

import { ReactComponent as ChevronLeft } from "../../../assets/images/chevron-back.svg";
import { ReactComponent as ChevronRight } from "../../../assets/images/chevron-forward.svg";
import { ReactComponent as ChevronCircleLeft } from "../../../assets/images/chevron-back-circle.svg";
import { ReactComponent as ChevronCircleRight } from "../../../assets/images/chevron-forward-circle.svg";
import { ReactComponent as LogoFacebook } from "../../../assets/images/logo-facebook.svg";
import { ReactComponent as LogoTwitter } from "../../../assets/images/logo-twitter.svg";
import { ReactComponent as LogoYoutube } from "../../../assets/images/logo-youtube.svg";
import { ReactComponent as LogoGithub } from "../../../assets/images/logo-github.svg";
import { ReactComponent as BookmarkEmpty } from "../../../assets/images/bookmark-outline.svg";
import { ReactComponent as BookmarkFilled } from "../../../assets/images/bookmark.svg";
import { ReactComponent as HeartEmpty } from "../../../assets/images/heart-outline.svg";
import { ReactComponent as HeartFilled } from "../../../assets/images/heart.svg";
import UserNameAndAvatarBig from "../../UserComponents/UserNameAndAvatarBig/UserNameAndAvatarBig";

import "./CardFullPopup.scss";

// Faire qqch avec clickedCard ! correspond à la etaget dans SearchPage, la card parente clickée où on aura accès à data-slideid
// handleCloseCardFullPopupClick vient de searchPage et permet de fermer la popup au click à coté de la popup
const CardFullPopup = ({
  showCardFullPopup,
  handleCloseCardFullPopupClick,
  clickedcard,
  goPreviousCard,
  goNextCard,
}) => {
  return (
    <div
      className={`CardFullPopup ${showCardFullPopup ? "active" : ""}`}
      onClick={(e) => {
        if (
          e.target.classList.contains("CardFullPopup") &&
          e.target.classList.contains("active")
        ) {
          handleCloseCardFullPopupClick(e);
        } else {
          return;
        }
      }}
    >
      <div className="CardFullPopup__wrapper">
        <div className="CardFullPopup__grid">
          <div className="CardFullPopup__header">
            <h1 className="title title-1">
              {clickedcard && clickedcard.title}
            </h1>
            <div className="CardFullPopup__action-button">
              <BookmarkEmpty className="card-action-button" />
              <HeartEmpty className="card-action-button" />
            </div>
          </div>
          <div className="CardFullPopup__grid__slide">
            <CardSliderFullCard
              clickedcardSlides={clickedcard && clickedcard.slides}
            />
          </div>
          <div className="grid__description">
            <h1 className="title title-1">Description</h1>
            <p>{clickedcard && clickedcard.description}</p>
          </div>
          <div className="grid__aside-infos-grid">
            <UserNameAndAvatarBig />
            <div className="infos__published-date">
              <p>Publié le :</p>
              <p>
                {clickedcard &&
                  `${clickedcard.created_at.getDate()}/${
                    clickedcard.created_at.getMonth() + 1
                  }/${clickedcard.created_at.getFullYear()}`}
              </p>
            </div>
            <span className="horizontal-separation-primary-light"></span>
            <div className="infos__tags">
              <h3 className="title title-3">Tags du Post :</h3>
              <div className="infos__tags--container">
                {clickedcard &&
                  clickedcard.tags.map((tag) => (
                    <span className="tag" key={tag}>{`#${tag}`}</span>
                  ))}
              </div>
            </div>
            <span className="horizontal-separation-primary-light"></span>
            <div className="infos__autres-posts">
              <h3 className="title title-3">Du même auteur :</h3>
              <div className="autres-posts--grid">
                {/* A chnger pour cliquable : */}
                <div className="autres-posts--preview"></div>
                <div className="autres-posts--preview"></div>
                <div className="autres-posts--preview"></div>
                <div className="autres-posts--preview"></div>
              </div>
            </div>
            <span className="horizontal-separation-primary-light"></span>
            <div className="infos__social">
              <h3 className="title title-3">Réseaux sociaux :</h3>
              <div className="social-grid">
                <LogoYoutube className="social-grid--item" />
                <LogoGithub className="social-grid--item" />
                <LogoFacebook className="social-grid--item" />
                <LogoTwitter className="social-grid--item" />
              </div>
            </div>
          </div>
          <div className="grid__commentaires">
            <h1 className="title title-1">Commentaires</h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            recusandae nulla cum illo harum totam magni optio quas earum aliquid
            eius, doloribus itaque? Optio at unde ex ullam, assumenda
            perspiciatis numquam ipsam, minus distinctio placeat temporibus
            laborum maiores ad pariatur. Porro inventore quae non doloribus cum
            possimus veniam quia voluptatibus molestias! Labore maxime iusto
            nisi recusandae ex, molestiae saepe neque dolorem quo placeat,
            excepturi cupiditate at perferendis obcaecati! Sunt sint voluptates
            aperiam, excepturi unde voluptatibus, quaerat, aspernatur quasi
            tempore harum nisi aut exercitationem possimus! Excepturi voluptates
            minus dolorum maxime exercitationem quisquam aliquid in similique
            alias. Et facilis voluptas culpa corporis!
          </div>
        </div>

        <ChevronCircleRight
          className="nav__chevron nav__chevron--right"
          onClick={() => goNextCard(clickedcard)}
        />
        <ChevronCircleLeft
          className="nav__chevron nav__chevron--left"
          onClick={() => goPreviousCard(clickedcard)}
        />
      </div>
    </div>
  );
};

export default CardFullPopup;
