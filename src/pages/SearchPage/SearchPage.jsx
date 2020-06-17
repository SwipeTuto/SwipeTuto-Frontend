// Présent dans App.js dans une Route ("/search")

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import FiltersBar from "../../components/LayoutComponents/FiltersBar/FiltersBar";
import CardGridList from "../../components/CardsComponents/CardGridList/CardGridList";
import CurrentSearchWords from "../../components/CurrentSearchWords/CurrentSearchWords";
import {
  selectPaginationPrevious,
  selectPaginationNext,
} from "../../redux/cards/cards-selectors";
import { selectTotalNumberOfCardsSearched } from "../../redux/filter/filter-selectors";
import { baseURL } from "../../services/configService";

import "./SearchPage.scss";

// Récupérer le handleClick sur les display large ou petit des grids et fixer à big ou small et passer ça dans CardGridList

const SearchPage = () => {
  const [gridSize, setGridSize] = useState("small");
  const [pageLinks, setPageLinks] = useState([]);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const previousBtn = useSelector(selectPaginationPrevious);
  const nextBtn = useSelector(selectPaginationNext);
  const totalNumberOfCardsSearched = useSelector(
    selectTotalNumberOfCardsSearched
  );
  const numberOfItemByPage = 1;

  if (totalNumberOfCardsSearched > numberOfItemByPage) {
  }

  useEffect(() => {
    // scroll reset
    if (window.scrollY) {
      window.scroll(0, 0);
    }

    // let pageLinksCopy = pageLinks;
    // setTotalNumberOfPages(
    //   Math.ceil(totalNumberOfCardsSearched / numberOfItemByPage)
    // );

    // for (let i = 1; i <= totalNumberOfPages; i++) {
    //   pageLinksCopy.push({
    //     className: "SearchPage__page-link",
    //     href: `${baseURL}/api/v1/card/?page=${i}`,
    //     content: i,
    //   });
    // }

    // setPageLinks(pageLinksCopy);
    // console.log(pageLinks);
  }, [totalNumberOfCardsSearched, pageLinks, totalNumberOfPages]);

  const handleClickSize = (e) => {
    const allGridSizeItems = [
      ...document.querySelectorAll(".FiltersBar__size-logo"),
    ];
    const newSize = e.target.dataset.gridsize;
    setGridSize(newSize);
    allGridSizeItems.map((item) => item.classList.remove("active"));
    e.target.classList.add("active");
  };

  return (
    <div className="SearchPage">
      <div className="SearchPage__wrapper">
        <CurrentSearchWords />
        <FiltersBar handleClickSize={handleClickSize} />
        <CardGridList cardsSize={gridSize} />
        <div className="SearchPage__navigation">
          {/* {pageLinks &&
            pageLinks.map((link) => (
              <a href={link.href} className={link.className} key={link.content}>
                {link.content}
              </a>
            ))} */}
          {/* {previousBtn && <a href={previousBtn}>Page Précédente</a>}
          {nextBtn && <a href={nextBtn}>Page Suivante</a>} */}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
