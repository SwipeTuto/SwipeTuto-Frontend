import React from "react";

import "./InfosPage.scss";

const InfosPage = () => {
  // scroll reset
  if (window.scrollY) {
    window.scroll(0, 0);
  }

  return (
    <div className="InfosPage">
      <h1 className="title title-1">Informations</h1>
      <h2 className="title title-2">Général</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, sint
        cum hic ad sequi molestiae molestias voluptatem repellendus magni
        explicabo fuga nam asperiores tenetur dolores sapiente modi magnam
        expedita assumenda voluptatibus? Nesciunt, quibusdam ea culpa error eos
        sed sit laudantium quaerat aliquam. Illum, consequatur nesciunt rem
        fugiat iusto quisquam temporibus.
      </p>
      <h2 className="title title-2">Le Site</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
        nostrum quae ut sequi blanditiis fugit, quis in, ipsum harum expedita
        velit! Expedita repellat, nostrum numquam accusamus dolor facilis iste
        sint, sed totam dolorum temporibus voluptatibus, natus deleniti
        laboriosam unde molestias reiciendis voluptates animi recusandae
        mollitia magni. Cupiditate est blanditiis, consectetur tenetur quam hic
        unde ut vitae sed autem neque? Atque similique laboriosam perspiciatis
        maxime asperiores suscipit architecto, nobis id dolore?
      </p>
      <h2 className="title title-2">Nous rejoindre</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere libero
        earum nisi dicta non fugit tempore pariatur ducimus? Ab, corporis alias?
        Porro eligendi ab laboriosam?
      </p>
    </div>
  );
};

export default InfosPage;
