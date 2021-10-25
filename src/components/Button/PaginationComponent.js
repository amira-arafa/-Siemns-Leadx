import React from "react";
import Pagination from "react-js-pagination";
import "./PaginationComponent.scss"

const PaginationComponent = ({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
  handlePageChange,
}) => {
  return (
    <>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={pageRangeDisplayed}
          onChange={handlePageChange}
          hideFirstLastPages
        />
    </>
  );
};

export default PaginationComponent;
