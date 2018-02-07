/**
*
* Pagination
*
*/

import React from 'react';
import ReactPaginate from 'react-paginate';
import './style.scss';


function Pagination(props) {
  return (<ReactPaginate
    containerClassName="pagination"
    pageClassName="pagination-item"
    breakClassName="pagination-item break"
    previousClassName="pagination-prev"
    nextClassName="pagination-next"
    {...props}
  />);
}

Pagination.propTypes = {

};

export default Pagination;
