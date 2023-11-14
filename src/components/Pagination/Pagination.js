import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Table } from 'components/Table/Table';
import { Container, TableWrapper } from './Pagination.styled';

export function PaginatedItems({ itemsPerPage, data, datesChanged, filter }) {
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
  const isMobile = useMediaQuery({ minWidth: 240, maxWidth: 540 });

  return (
    <Container
      style={{
        display: `flex`,
        flexDirection: `column`,
        alignContent: `center`,
        justifyContent: `center`,
      }}
    >
      <TableWrapper className="table-responsive card">
        <Table
          data={currentItems}
          datesChanged={datesChanged}
          filter={filter}
        />
      </TableWrapper>
      <ReactPaginate
        nextLabel="> >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={isMobile ? 2 : 3}
        marginPagesDisplayed={isMobile ? 1 : 2}
        pageCount={pageCount}
        previousLabel="< <"
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
    </Container>
  );
}
