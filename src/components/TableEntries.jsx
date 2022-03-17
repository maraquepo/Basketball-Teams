import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';

const TableEntries = ({teamData}) => {
  const {abbreviation, city, conference, division, name} = teamData

  return (
    <div>
      <CardGroup className='tableData'>
        <Card body>{name}</Card>
        <Card body>{city}</Card>
        <Card body>{abbreviation}</Card>
        <Card body>{conference}</Card>
        <Card body>{division}</Card>
      </CardGroup>
    </div>
  );
};

export default TableEntries;
