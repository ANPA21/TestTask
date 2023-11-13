import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { Table } from 'components/Table/Table';

export function PaginatedItems({ itemsPerPage, data, datesChanged }) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    if (data.length < 20) {
      setItemOffset(0);
    }
  }, [data]);

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <div
      style={{
        display: `flex`,
        flexDirection: `column`,
        alignContent: `center`,
        justifyContent: `center`,
      }}
    >
      <div className="table-responsive">
        <Table data={currentItems} datesChanged={datesChanged} />
      </div>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination justify-content-center"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
