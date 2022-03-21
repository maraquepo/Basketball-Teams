import React, { useState } from 'react';
import './Table.css';
import { Card, CardGroup } from 'react-bootstrap';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import data from '../sample';
import TableEntries from './TableEntries';
import PaginationButtons from './PaginationButtons';
import sample from '../sample';

const Table = () => {
  let sampleData = data.data;

  const [teams, setTeams] = useState(sampleData)
  const [isUp, setIsUp] = useState(false);
  const [pageNumber, setPageNumber] = useState(0)

  const teamsPerPage = 7
  const pagesVisited = pageNumber * teamsPerPage

  console.log(pageNumber)

  const currentPage = teams
    .slice(pagesVisited, pagesVisited + teamsPerPage)
    .map(team => {
      return <TableEntries teamData={team} key={team.id} />
    })

  const handleSort = () => {
    setIsUp((prev) => !prev);
  };

  const paginate = (number) => setPageNumber(number);

  const sortedData = sampleData.sort((a, b) => {
    return a.city > b.city ? 1 : -1;
  });

  if (!isUp) {
    sampleData = sortedData.reverse();
  } else {
    sampleData = sortedData;
  }

  return (
    <>
      <div className='tableContainer'>
        <CardGroup className='tableTitles'>
          <Card body>Team Name</Card>
          <Card body>
            City
            {isUp ? (
              <ArrowDropUpIcon onClick={handleSort} style={{ cursor: 'pointer' }} />
            ) : (
              <ArrowDropDownIcon onClick={handleSort} style={{ cursor: 'pointer' }} />
            )}
          </Card>
          <Card body>Abbreviation</Card>
          <Card body>Conference</Card>
          <Card body>Division</Card>
        </CardGroup>
        {currentPage}
      </div>
      <div className="pagination">
        <PaginationButtons paginate={paginate} pageNumber={pageNumber} setPageNumber={setPageNumber}/>
      </div>
    </>
  );
};

export default Table;
