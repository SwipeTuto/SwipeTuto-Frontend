import React, { useState, useEffect } from "react";

import "./Pagination.scss";

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
  const [allLinks, setAllLinks] = useState();
  const currentPage = currentSearch.searchPage;

  useEffect(() => {
    const start = startPage(parseInt(currentPage), totalPages);
    const end = endPage(parseInt(currentPage), totalPages);
    const links = getAllLinksArray(start, end);
    setAllLinks(links);
    if (window.scrollY) {
      window.scroll(0, 0);
    }
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
      return;
    }
  };

  const getAllLinksArray = (start, end) => {
    let array = [];

    for (let i = start; i <= end; i++) {
      let object = {};
      object["data-page"] = i;
      object["key"] = i;
      object["content"] = i;
      array.push(object);
    }
    return array;
  };

  return (
    <>
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
                link["data-page"] === parseInt(currentPage) ? "active" : ""
              }`}
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
