import React from "react";
import { ReactComponent as ChevronLeft } from "../../assets/images/chevron-back.svg";
import { ReactComponent as ChevronRight } from "../../assets/images/chevron-forward.svg";
import { ReactComponent as LogoFacebook } from "../../assets/images/logo-facebook.svg";
import { ReactComponent as LogoTwitter } from "../../assets/images/logo-twitter.svg";
import { ReactComponent as LogoYoutube } from "../../assets/images/logo-youtube.svg";
import { ReactComponent as LogoGithub } from "../../assets/images/logo-github.svg";
import { ReactComponent as BookmarkEmpty } from "../../assets/images/bookmark-outline.svg";
import { ReactComponent as BookmarkFilled } from "../../assets/images/bookmark.svg";
import { ReactComponent as HeartEmpty } from "../../assets/images/heart-outline.svg";
import { ReactComponent as HeartFilled } from "../../assets/images/heart.svg";
import UserNameAndAvatarBig from "../../components/UserNameAndAvatarBig/UserNameAndAvatarBig";

import "./CardPage.scss";

const CardPage = () => {
  return (
    <div className="CardPage">
      <div className="CardPage__wrapper">
        <div className="CardPage__header">
          <h1 className="title title-1">Titre de la card cliquée</h1>
          <div className="CardPage__action-button">
            <BookmarkEmpty className="card-action-button" />
            <HeartEmpty className="card-action-button" />
          </div>
        </div>
        <div className="CardPage__grid">
          <div className="CardPage__grid__slide">
            <div className="grid__slide"></div>
            <ChevronLeft className="grid__chevron chevron-left" />
            <ChevronRight className="grid__chevron chevron-right" />
          </div>
          <div className="grid__description">
            <h1 className="title title-1">Description</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              perspiciatis ut doloribus necessitatibus sunt, provident id
              dolorem temporibus officiis, sapiente nostrum excepturi! Deleniti
              minima amet ducimus in. Sed deserunt quo laborum culpa fuga quia
              quam eaque beatae. Perspiciatis, assumenda laudantium quasi alias
              repellat accusamus vero earum ratione at nisi quisquam ab autem
              beatae maxime quam commodi id numquam. Eligendi tenetur labore
              cumque quae, dolore animi nihil dolorem delectus neque odio iste
              sint nobis quam laboriosam porro, repellat pariatur? Tempore vitae
              explicabo saepe dolorem sapiente, eligendi numquam accusamus, iure
              nisi et earum ut veniam ipsam minus officia. Quaerat, incidunt.
              Aliquid reprehenderit, hic animi exercitationem non officia
              quisquam provident vitae quaerat facere? Nam voluptate quod
              deserunt esse ullam. Necessitatibus cupiditate perferendis quod,
              fugit magnam culpa assumenda illo delectus sapiente officia et
              facilis. Perferendis, officia magni nihil eaque iure asperiores
              pariatur inventore rem, tenetur illo nemo ea minus neque cumque,
              consequatur quod. Ipsum minus itaque quod dolores quisquam quam
              aliquam dolorum! Reprehenderit quasi in excepturi vero! Doloremque
              ipsum hic voluptatibus est. Placeat deserunt et quae eveniet
              molestiae consequuntur nihil officia facilis quam in? Velit
              aperiam officiis repudiandae? Aliquid dolores, delectus fugit amet
              explicabo obcaecati? Perspiciatis tempora quisquam nulla, ipsa
              itaque beatae vitae asperiores? Assumenda, quo mollitia. Commodi
              id quo molestias, tempora dolor illo ipsam voluptates omnis
              repellat laboriosam. Blanditiis earum exercitationem fugit
              perferendis esse vitae, aliquam alias ducimus porro est minima
              assumenda optio velit iusto molestias nostrum dolores id. Commodi
              tempore alias officiis fugit. Dolorum consequuntur culpa inventore
              pariatur veritatis aperiam animi distinctio? Recusandae dolorem
              saepe dolorum quae tenetur magnam, quibusdam consequatur laborum
              nam dolore corrupti animi sunt quia sequi error harum, sed autem
              libero est nihil quam quidem ducimus! Excepturi, expedita minima
              odio cupiditate deserunt, ut vitae animi soluta voluptatibus esse
              reprehenderit labore quibusdam inventore quisquam quis! Itaque,
              eaque nulla? Illo, quod.
            </p>
          </div>
          <div className="grid__aside-infos-grid">
            <UserNameAndAvatarBig />
            <div className="infos__published-date">
              <p>Publié le :</p>
              <p>20/05/2020</p>
            </div>
            <span className="horizontal-separation-primary"></span>
            <div className="infos__tags">
              <h3 className="title title-3">Tags du Post :</h3>
              <div className="infos__tags--container">
                <span className="tag">#CSS</span>
                <span className="tag">#HTML</span>
                <span className="tag">#JS</span>
              </div>
            </div>
            <span className="horizontal-separation-primary"></span>
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
            <span className="horizontal-separation-primary"></span>
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
        <div className="CardPage__navigation">
          <div className="navigation__previous">
            <ChevronLeft className="nav__chevron" />
            <p>Précédent Post</p>
          </div>
          <div className="navigation__next">
            <p>Post Suivant</p>
            <ChevronRight className="nav__chevron" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
