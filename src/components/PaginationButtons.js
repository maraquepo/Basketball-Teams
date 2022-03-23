import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationButtons = ({paginate, pageNumber, setPageNumber, numberOfTeams, teamsPerPage}) => {
  const pageNumberArr = [];

  const handlePrev = (e) => {
    e.preventDefault()
      setPageNumber(pageNumber - 1)
  }

  const handleNext = (e) => {
    e.preventDefault()
    setPageNumber(pageNumber + 1)
}

  for (let i = 1; i <= Math.ceil(numberOfTeams / teamsPerPage); i++) {
    pageNumberArr.push(i)
  }

  return (
    <Pagination size='lg'>
      {pageNumber === 0 ? <Pagination.Prev data-testid="prev-pag-button-disabled" disabled /> : <Pagination.Prev data-testid="prev-pag-button" onClick={(e) => {handlePrev(e)}} />}
      {pageNumberArr.map(number => {
        return <Pagination.Item key={number} data-testid={`button-${number}`} onClick={() => paginate(number - 1)} href='!#'>{number}</Pagination.Item>
      })}

      {pageNumber === 4 ? <Pagination.Next data-testid="next-pag-button-disabled" disabled/> : <Pagination.Next data-testid="next-pag-button" onClick={(e) => {handleNext(e)}}/>}
    </Pagination>
  )
}

export default PaginationButtons
