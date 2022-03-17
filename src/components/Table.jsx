import React, { useState } from 'react';
import './Table.css';
import { Card, CardGroup } from 'react-bootstrap';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import data from '../sample';
import TableEntries from './TableEntries';

const Table = () => {
  let sampleData = data.data;

  const [isUp, setIsUp] = useState(false);

  console.log(isUp);

  const func = () => {
    setIsUp((prev) => !prev);
  };

  const sortedData = sampleData.sort((a, b) => {
    return a.city > b.city ? 1 : -1;
  });

  if (!isUp) {
    sampleData = sortedData.reverse()
  } else {
    sampleData = sortedData
  }


  return (
    <div className='tableContainer'>
      <CardGroup className='tableTitles'>
        <Card body>Team Name</Card>
        <Card body>
          City
          {isUp ? (
            <ArrowDropUpIcon onClick={func} style={{ cursor: 'pointer' }} />
          ) : (
            <ArrowDropDownIcon onClick={func} style={{ cursor: 'pointer' }} />
          )}
        </Card>
        <Card body>Abbreviation</Card>
        <Card body>Conference</Card>
        <Card body>Division</Card>
      </CardGroup>
      {sampleData.map((team) => {
        return <TableEntries teamData={team} key={team.id} />;
      })}
    </div>
  );
};

export default Table;
