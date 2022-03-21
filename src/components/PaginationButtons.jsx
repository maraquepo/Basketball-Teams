import React from 'react'
import { Pagination } from 'react-bootstrap'


const PaginationButtons = ({paginate, pageNumber, setPageNumber}) => {
  const pageNumberArr = [];

  const handlePrev = () => {
      setPageNumber(pageNumber--)
  }

  const handleNext = () => {
    setPageNumber(pageNumber++)
}

  for (let i = 1; i <= 5; i++) {
    pageNumberArr.push(i)
  }

  return (
    <Pagination style={{marginRight: 0}} size='lg'>
      {pageNumber === 0 ? <Pagination.Prev disabled /> : <Pagination.Prev onClick={handlePrev} />}
      {pageNumberArr.map(number => {
        return <Pagination.Item onClick={() => paginate(number - 1)} href='!#'>{number}</Pagination.Item>
      })}

      {pageNumber === 4 ? <Pagination.Next disabled/> : <Pagination.Next onClick={handleNext}/>}
    </Pagination>
  )
}

export default PaginationButtons