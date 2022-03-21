import React from 'react'
import { Pagination } from 'react-bootstrap'


const PaginationButtons = ({paginate, pageNumber, setPageNumber}) => {
  const pageNumberArr = [];

  const handlePrev = () => {
      setPageNumber(pageNumber - 1)
  }

  const handleNext = () => {
    setPageNumber(pageNumber + 1)
}

  for (let i = 1; i <= 5; i++) {
    pageNumberArr.push(i)
  }

  return (
    <Pagination style={{marginRight: 0}} size='lg'>
      {pageNumber === 0 ? <Pagination.Prev data-testid="prev-pag-button" disabled /> : <Pagination.Prev data-testid="prev-pag-button" onClick={handlePrev} />}
      {pageNumberArr.map(number => {
        return <Pagination.Item key={number} data-testid={`button-${number}`}onClick={() => paginate(number - 1)} href='!#'>{number}</Pagination.Item>
      })}

      {pageNumber === 4 ? <Pagination.Next data-testid="next-pag-button" disabled/> : <Pagination.Next data-testid="next-pag-button" onClick={handleNext}/>}
    </Pagination>
  )
}

export default PaginationButtons