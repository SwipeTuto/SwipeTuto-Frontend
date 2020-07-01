import React, { useState } from "react";

import "./Pagination.scss";

const Pagination = ({
  currentPageClicked,
  totalPages,
  goToLastPage,
  goToFirstPage,
  goToPreviousPage,
  goToNextPage,
  handlePaginationNavigation,
}) => {
  const currentPage = parseInt(currentPageClicked);

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
      object["data-link"] = `http://localhost:8000/api/v1/card/?page=${i}`;
      object["key"] = i;
      object["content"] = i;
      array.push(object);
    }
    return array;
  };

  const startIndex = startPage(currentPage, totalPages);
  const endIndex = endPage(currentPage, totalPages);
  const allLinks = getAllLinksArray(startIndex, endIndex);
  // console.log(currentPage, startIndex, endIndex, totalPages);

  return (
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
  );
};

export default Pagination;
