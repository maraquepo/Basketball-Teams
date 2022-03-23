import React, { useState } from 'react';
import { Card, CardGroup } from 'react-bootstrap';
import '../Styles/TableEntries.css';
import axios from 'axios';
import RandomGameModal from './RandomGameModal';
import moment from 'moment';

const TableEntries = ({ teamData }) => {
  const { abbreviation, city, conference, division, name, id } = teamData;

  const [show, setShow] = useState(false);
  const [gameData, setGameData] = useState({
    date: null,
    home_team: null,
    home_team_score: null,
    vistor_team: null,
    visitor_team_score: null,
    totalGames: null,
  });

  // handles NBA team stats modal
  const handleModal = () => {
    setShow((prev) => !prev);
    fetchGameData();
  };

  // gets current date
  let now = moment().format('YYYY-MM-DD');

  // fetches API of a random game of a chosen NBA team. Only selects finished games using current date as a constraint
  const fetchGameData = () => {
    axios
      .get(
        `https://www.balldontlie.io/api/v1/games?seasons[]=2021&team_ids[]=${id}&per_page=100&end_date=${now}`
      )
      .then((data) => {
        // grabs stats of a random game
        let randomGameData = data.data.data[Math.floor(Math.random() * 25)];
        // puts API data into an object to be passed down as a prop
        setGameData({
          date: randomGameData.date,
          home_team: randomGameData.home_team.name,
          home_team_score: randomGameData.home_team_score,
          visitor_team: randomGameData.visitor_team.name,
          visitor_team_score: randomGameData.visitor_team_score,
          totalGames: data.data.meta.total_count,
        });
      });
  };

  return (
    <div>
      <CardGroup className='tableData' onClick={handleModal}>
        <Card body data-testid={`team-${name}`}>
          {name}
        </Card>
        <Card body>{city}</Card>
        <Card body>{abbreviation}</Card>
        <Card body>{conference}</Card>
        <Card body>{division}</Card>
      </CardGroup>
      <RandomGameModal
        show={show}
        handleModal={handleModal}
        gameData={gameData}
        teamData={teamData}
      />
    </div>
  );
};

export default TableEntries;
