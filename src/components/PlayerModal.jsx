import React from 'react'
import {Modal} from 'react-bootstrap'
import './PlayerModal.css';


const PlayerModal = ({playerData, show, handleModal}) => {

  const positionConverter = (position) => {
    if (position === "C") {
      return "Center"
    } else if (position === "F-C") {
      return "Foward Center"
    } else if (position === "F") {
      return "Forward"
    } else if (position === "G") {
      return "Guard"
    } else {
      return ""
    }
  }
  console.log('player', playerData)

  return (
    <Modal show={show} onHide={handleModal}>
      {playerData &&
      <div>
        <Modal.Header closeButton>
          <Modal.Title data-testid="player-name">{`${playerData.first_name} ${playerData.last_name}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="playerInfo">
            <div className='title'>Team</div>
            <div>{playerData.team.full_name}</div>
            {playerData.position &&
              <>
                <div className='title'>Position</div>
                <div>{positionConverter(playerData.position)}</div>
              </>}
            {playerData.height_feet &&
              <>
                <div className='title'>Height</div>
                <div>{`${playerData.height_feet}' ${playerData.height_inches}"`}</div>
                <div className='title'>Weight (lbs)</div>
                <div>{playerData.weight_pounds}</div>
              </>
            }
          </div>
        </Modal.Body>
        </div>}
    </Modal>
  )
}

export default PlayerModal