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

const Pagination = ({ location }) => {
  const dispatch = useDispatch();

  const [redirection, setRedirection] = useState(false);
  const [firstPart, setFirstPart] = useState();
  const [lastPart, setLastPart] = useState();
  const currentSearch = useSelector(selectCurrentSearch);
  const currentPage = useSelector(selectSearchPage);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const totalNumberOfCards = useSelector(selectTotalNumberOfResults);

  const cardsFetched = useSelector(selectCardsFetched);
  if (cardsFetched.next || cardsFetched.previous) {
    const nextLink =
      (cardsFetched.next && cardsFetched.next) ||
      (cardsFetched.previous && cardsFetched.previous);
    const splitNextLink = nextLink.split("page=");
    setFirstPart([...splitNextLink[0]].join("") + "page=");
    setLastPart([...splitNextLink[1].slice(1)].join(""));
  }

  // A CHANGER EN FONCTION DU BACK :
  const numberOfItemByPage = 16;

  const [topic, category, ordering, search, page] = urlParams(location);

  useEffect(() => {
    setRedirection(true);
    setRedirection(false);

    setTotalNumberOfPages(Math.ceil(totalNumberOfCards / numberOfItemByPage));
  }, [totalNumberOfCards]);

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
    }
  };

  const getAllLinksArray = (start, end) => {
    let array = [];

    for (let i = start; i <= end; i++) {
      let object = {};
      object["data-page"] = i;
      object["data-link"] = firstPart + i + lastPart;
      object["key"] = i;
      object["content"] = i;
      array.push(object);
    }

    return array;
  };

  const handlePaginationNavigation = (e) => {
    const navPageNumber = e.target.dataset.page;

    dispatch(
      getCardAfterfilterAction({
        ...currentSearch,
        searchPage: navPageNumber,
      })
    );
    dispatch(setCurrentSearch("searchPage", navPageNumber));
  };

  const goToFirstPage = () => {
    dispatch(
      getCardAfterfilterAction({
        ...currentSearch,
        searchPage: 1,
      })
    );
    dispatch(setCurrentSearch("searchPage", 1));
    setRedirection(true);
  };
  const goToLastPage = () => {
    dispatch(
      getCardAfterfilterAction({
        ...currentSearch,
        searchPage: totalNumberOfPages,
      })
    );
    dispatch(setCurrentSearch("searchPage", totalNumberOfPages));
    setRedirection(true);
  };
  const goToPreviousPage = () => {
    dispatch(
      getCardAfterfilterAction({
        ...currentSearch,
        searchPage: currentPage - 1,
      })
    );
    dispatch(setCurrentSearch("searchPage", currentPage - 1));
    setRedirection(true);
  };
  const goToNextPage = () => {
    dispatch(
      getCardAfterfilterAction({
        ...currentSearch,
        searchPage: currentPage + 1,
      })
    );
    dispatch(setCurrentSearch("searchPage", currentPage + 1));
    setRedirection(true);
  };

  const startIndex = startPage(currentPage, totalNumberOfPages);
  const endIndex = endPage(currentPage, totalNumberOfPages);
  const allLinks = getAllLinksArray(startIndex, endIndex);

  const redirectLink = SearchLinkRedirect();

  return (
    <>
      {redirection && <Redirect to={redirectLink} />}
      <div className="Pagination">
        {currentPage === 1 ? (
          ""
        ) : (
          <>
            <div className="Pagination__button" onClick={goToFirstPage}>
              &#171;
            </div>
            <div className="Pagination__button" onClick={goToPreviousPage}>
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
        {currentPage === totalNumberOfPages || totalNumberOfPages === 0 ? (
          ""
        ) : (
          <>
            <div className="Pagination__button" onClick={goToNextPage}>
              &#8250;
            </div>
            <div className="Pagination__button" onClick={goToLastPage}>
              &#187;
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default withRouter(Pagination);
