import React from "react";

const PaginationComponent = ({ totalPages, currentPage, setPage }: any) => {
  const paginationItems: any = [];

  // Loop through totalPages and generate pagination elements
  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    paginationItems.push(
      <li key={pageNumber}>
        <button
          onClick={() => setPage(pageNumber)}
          className={pageNumber === currentPage ? "active" : ""}
        >
          {pageNumber < 10 ? "0" + pageNumber : pageNumber}
        </button>
      </li>
    );
  }

  return (
    <div className="cashier-pagination text-right maxSm:text-center pagination-div">
      <ul>{paginationItems}</ul>
    </div>
  );
};

export default PaginationComponent;
