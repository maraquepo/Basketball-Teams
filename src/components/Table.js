import React, { useState, useEffect } from 'react';
import '../Styles/Table.css';
import { Card, CardGroup } from 'react-bootstrap';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TableEntries from './TableEntries';
import PaginationButtons from './PaginationButtons';
import axios from 'axios';

const Table = () => {
  let [teams, setTeams] = useState([]);
  const [isUp, setIsUp] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [teamsPerPage, setTeamsPerPage] = useState(7);

  const pagesVisited = pageNumber * teamsPerPage;
  const numberOfTeams = teams.length;

  const fetchTeams = () => {
    axios.get('https://www.balldontlie.io/api/v1/teams')
      .then((data) => {
        setTeams(data.data.data)
      })
  }

  const currentPage = teams.slice(pagesVisited, pagesVisited + teamsPerPage).map((team) => {
    return <TableEntries teamData={team} key={team.id} />;
  });

  const handleSort = () => {
    setIsUp((prev) => !prev);
  };

  const paginate = (number) => setPageNumber(number);


  const sortedData = teams.sort((a, b) => {
    return a.city > b.city ? 1 : -1;
  });

  if (!isUp) {
    teams = sortedData.reverse();
  } else {
    teams = sortedData;
  }

  useEffect(() => {
    fetchTeams()
  },[])

  return (
    <>
      <div className='tableContainer'>
        <CardGroup className='tableTitles'>
          <Card data-testid='Team Name' body>
            Team Name
          </Card>
          <Card data-testid='City' body>
            City
            {isUp ? (
              <ArrowDropUpIcon onClick={handleSort} style={{ cursor: 'pointer' }} />
            ) : (
              <ArrowDropDownIcon onClick={handleSort} style={{ cursor: 'pointer' }} />
            )}
          </Card>
          <Card data-testid='Abbreviation' body>
            Abbreviation
          </Card>
          <Card data-testid='Conference' body>
            Conference
          </Card>
          <Card data-testid='Division' body>
            Division
          </Card>
        </CardGroup>
        {currentPage}
        <div className='pagination'>
          <PaginationButtons
            paginate={paginate}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            numberOfTeams={numberOfTeams}
            teamsPerPage={teamsPerPage}
            setTeamsPerPage={setTeamsPerPage}
          />
        </div>
      </div>
    </>
  );
};

export default Table;
