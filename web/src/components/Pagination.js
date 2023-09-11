import React from 'react';

const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const MyPagination = ({
  limit,
  total,
  offset,
  setOffset
}) => {
  const current = offset ? offset / limit + 1 : 1;
  const pages = Math.ceil(total / limit);
  const maxFirst = Math.max(pages - (MAX_ITEMS - 1), 1);
  const first = Math.min(
    Math.max(current - MAX_LEFT, 1),
    maxFirst
  );

  function onPageChange(page) {
    setOffset((page - 1) * limit);
  }

  return (
    <ul className="pagination">
      <li>
        <button
          onClick={() => onPageChange(current - 1)}
          disabled={current === 1}
        >
          Anterior
        </button>
      </li>
      {Array.from({ length: Math.min(MAX_ITEMS, pages) })
        .map((_, index) => index + first)
        .map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={
                page === current
                  ? 'pagination__item--active'
                  : null
              }
            >
              {page}
            </button>
          </li>
        ))}
      <li>
        <button
          onClick={() => onPageChange(current + 1)}
          disabled={current === pages}
        >
          Próxima
        </button>
      </li>
    </ul>
  );
};

export default MyPagination;


































// import { Pagination } from "react-bootstrap";

// export default function Pagination({total, current, onChangePage}) {
//     let items = []
//     if(current > 1){
//         items.push(<Pagination.Prev kay="prev" onClick={() => onChangePage(page - 1)}/>)
//     }

//     for (let page = 1; page <= total; page++) {
//         items.push(
//             <Pagination.Item key={page} data-page={page} active={page === current} onClick={() => onChangePage(page)}>
//                 {page}
//             </Pagination.Item>
//         )
//     }

//     if (current < total) {
//         items.push(<Pagination.Next key="next" onClick={() => onChangePage(page + 1)}/>)
//     }

//     return (
//         <Pagination
//     )
// }