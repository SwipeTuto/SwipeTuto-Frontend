import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import SearchLinkRedirect from "../../../helper/SearchLinkRedirect";
import { urlParams } from "../../../helper/index";
import "./Pagination.scss";
import {
  selectCardsFetched,
  selectCurrentSearch,
  selectSearchPage,
  selectTotalNumberOfResults,
} from "../../../redux/filter/filter-selectors";
import { getCardsLoading } from "../../../redux/cards/cards-actions";
import {
  getOtherPageAction,
  getCardAfterfilterAction,
  setCurrentSearch,
} from "../../../redux/filter/filter-actions";
import { baseURL } from "../../../services/configService";
import { selectIsLoaded } from "../../../redux/cards/cards-selectors";

const Pagination = ({
  currentSearch,
  totalPages,
  goToFirstPage,
  goToLastPage,
  goToPreviousPage,
  goToNextPage,
  handlePaginationNavigation,
  location,
}) => {
  const dispatch = useDispatch();

  const [redirection, setRedirection] = useState(false);
  const [firstPart, setFirstPart] = useState();
  const [lastPart, setLastPart] = useState();
  const [startIndex, setStartIndex] = useState();
  const [endIndex, setEndIndex] = useState();
  const [allLinks, setAllLinks] = useState();
  const currentPage = currentSearch.searchPage;
  const isLoaded = useSelector(selectIsLoaded);

  const totalNumberOfCards = useSelector(selectTotalNumberOfResults);

  const cardsFetched = useSelector(selectCardsFetched);

  useEffect(() => {
    setRedirection(true);
    setRedirection(false);
    if (cardsFetched.next || cardsFetched.previous) {
      const nextLink =
        (cardsFetched.next && cardsFetched.next) ||
        (cardsFetched.previous && cardsFetched.previous);
      const splitNextLink = nextLink.split("page=");
      const firstLinkPart = [...splitNextLink[0]]
        ? [...splitNextLink[0]].join("") + "page="
        : "page=";
      const lastLinkPart = splitNextLink[1]
        ? [...splitNextLink[1].slice(1)].join("")
        : "";
      setFirstPart(firstLinkPart);
      setLastPart(lastLinkPart);
    }

    const start = startPage(parseInt(currentPage), totalPages);
    const end = endPage(parseInt(currentPage), totalPages);
    const links = getAllLinksArray(start, end, firstPart, lastPart);

    // console.log(firstPart, lastPart);

    setStartIndex(start);
    setEndIndex(end);
    setAllLinks(links);
  }, [totalPages, currentPage]);

  const startPage = (currentPage, totalPages) => {
    if (totalPages < 6) {
      return 1;
    } else if (currentPage === 1 || currentPage === 2 || currentPage === 3) {
      return 1;
    } else if (currentPage === totalPages - 1) {
      return currentPage - 3;
    } else if (currentPage === totalPages) {
      return currentPage - 4;
    } else if (currentPage - 2 > 1) {
      return currentPage - 2;
    }
  };

  const endPage = (currentPage, totalPages) => {
    if (totalPages < 6) {
      return totalPages;
    } else if (currentPage === totalPages) {
      return totalPages;
    } else if (
      currentPage + 1 === totalPages ||
      currentPage + 2 === totalPages ||
      currentPage + 3 === totalPages
    ) {
      return totalPages;
    } else if (currentPage === 1 || currentPage === 2) {
      return 5;
    } else if (currentPage + 2 < totalPages) {
      return currentPage + 2;
    } else {
      console.log("erreur endPage");
    }
  };

  const getAllLinksArray = (start, end, firstPart, lastPart) => {
    let array = [];

    for (let i = start; i <= end; i++) {
      let object = {};
      object["data-page"] = i;
      object["data-link"] = `${firstPart}${i}${lastPart}`;
      object["key"] = i;
      object["content"] = i;
      array.push(object);
    }

    return array;
  };

  // const redirectLink = SearchLinkRedirect();

  return (
    <>
      {/* {redirection && <Redirect to={redirectLink} />} */}
      <div className="Pagination">
        {currentPage === 1 ? (
          ""
        ) : (
          <>
            <div className="Pagination__button" onClick={() => goToFirstPage()}>
              &#171;
            </div>
            <div
              className="Pagination__button"
              onClick={() => goToPreviousPage()}
            >
              &#8249;
            </div>
          </>
        )}

        {allLinks &&
          allLinks.map((link) => (
            <div
              className={`Pagination__indicator ${
                link["data-page"] === currentPage ? "active" : ""
              }`}
              data-link={link["data-link"]}
              data-page={link["data-page"]}
              key={link.key}
              onClick={(e) => handlePaginationNavigation(e)}
            >
              {link.content}
            </div>
          ))}

        {currentPage === totalPages || totalPages === 0 ? (
          ""
        ) : (
          <>
            <div className="Pagination__button" onClick={() => goToNextPage()}>
              &#8250;
            </div>
            <div className="Pagination__button" onClick={() => goToLastPage()}>
              &#187;
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Pagination;
