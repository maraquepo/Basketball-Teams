import React from 'react';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import '../Styles/TableEntries.css';

const RandomGameModal = ({show, handleModal, gameData, teamData }) => {

  const {full_name, name} = teamData
  const {totalGames, date, home_team, home_team_score, visitor_team, visitor_team_score} = gameData

  return (
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
            <div>{moment(date).format('YYYY-M-D')}</div>
            <div>Home Team</div>
            <div>{home_team}</div>
            <div>Home Team Score</div>
            <div>{home_team_score}</div>
            <div>Visitor Team</div>
            <div>{visitor_team}</div>
            <div>Visitor Team Score</div>
            <div>{visitor_team_score}</div>
          </div>
        </div>
      </div>
    </Modal.Body>
  </Modal>
  )
}

export default RandomGameModal;
