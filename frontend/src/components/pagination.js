import React from "react";
import { Pagination } from "react-bootstrap";
import { getLocalText } from "../localate/i18nextInit";

export default function PaginationPage({
  active,
  totalPage,
  currentPage,
  setActive,
}) {
  let pagination = [],
    i = 1;
  while (i <= totalPage) {
    if (
      i <= 1 ||
      i >= totalPage - 2 ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pagination.push(i);
      i++;
    } else {
      pagination.push("...");
      //jump to the next page to be linked in the navigation
      i = i < currentPage ? currentPage - 1 : totalPage - 0;
    }
  }
  return (
    <div>
      <Pagination size="sm" className=" p-5">
        <Pagination.Item
          disabled={totalPage === 1 || currentPage === 1 ? true : false}
          className="mx-1 rounded-4"
          onClick={() => {
            if (active > 1) {
              setActive(active - 1);
            }
          }}
        >
          {getLocalText("Pagination.prev")}
        </Pagination.Item>
        {pagination.map((item, index) => {
          return (
            <Pagination.Item
              key={index}
              active={item === currentPage}
              onClick={() => (item === "..." ? "" : setActive(item))}
            >
              {item}
            </Pagination.Item>
          );
        })}
        <Pagination.Item
          disabled={totalPage === 1 || currentPage === totalPage ? true : false}
          className="mx-1"
          onClick={() => {
            if (active < totalPage) {
              setActive(active + 1);
            }
          }}
        >
          {getLocalText("Pagination.next")}
        </Pagination.Item>
      </Pagination>
    </div>
  );
}
