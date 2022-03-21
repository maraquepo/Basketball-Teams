import React, { useState } from 'react';
import { Card, CardGroup, Modal } from 'react-bootstrap';
import './TableEntries.css';
import axios from 'axios'
import moment from 'moment'

const TableEntries = ({teamData}) => {
  const {abbreviation, city, conference, division, name, full_name, id} = teamData

  const [show, setShow] = useState(false);
  const [totalGames, setTotalGames] = useState(0)
  const [gameData, setGameData] = useState({
    date: null,
    home_team: null,
    home_team_score: null,
    vistor_team: null,
    visitor_team_score: null
  })

  // handles NBA team stats modal
  const handleModal = () => {
    setShow(prev => !prev)
    fetchGameData()
  }

  // gets current date
  let now = moment().format('YYYY-MM-DD')

  // fetches API of a random game of a chosen NBA team. Only selects finished games using current date as a constraint
  const fetchGameData = () => {
    axios.get(`https://www.balldontlie.io/api/v1/games?seasons[]=2021&team_ids[]=${id}&per_page=100&end_date=${now}`)
      .then((data) => {
        // grabs stats of a random game
        let randomGameData = data.data.data[Math.floor(Math.random() * 25)]
        setTotalGames(data.data.meta.total_count)
        setGameData({
          date: randomGameData.date,
          home_team: randomGameData.home_team.name,
          home_team_score: randomGameData.home_team_score,
          visitor_team: randomGameData.visitor_team.name,
          visitor_team_score: randomGameData.visitor_team_score
        })
      })
  }


  return (
    <div>
      <CardGroup className='tableData' onClick={handleModal}>
        <Card body>{name}</Card>
        <Card body>{city}</Card>
        <Card body>{abbreviation}</Card>
        <Card body>{conference}</Card>
        <Card body>{division}</Card>
      </CardGroup>
      <Modal show={show} onHide={handleModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='allContent'>
            <div className="summary">
              <div>Team Full Name</div>
              <div>{full_name}</div>
              <div>Total Games in 2021</div>
              <div>{totalGames}</div>
            </div>
            <div className="randomGame">
              <div>Random Game Details:</div>
              <div className="gameData">
                <div>Date</div>
                <div>{moment(gameData.date).format('YYYY-M-D')}</div>
                <div>Home Team</div>
                <div>{gameData.home_team}</div>
                <div>Home Team Score</div>
                <div>{gameData.home_team_score}</div>
                <div>Visitor Team</div>
                <div>{gameData.visitor_team}</div>
                <div>Visitor Team Score</div>
                <div>{gameData.visitor_team_score}</div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TableEntries;
