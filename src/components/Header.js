import React, { useState } from 'react';
import '../Styles/Header.css';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import PlayerModal from './PlayerModal';

const Header = () => {
  const [searchValue, setSearchValue] = useState('')
  const [playerData, setPlayerData] = useState('')
  const [show, setShow] = useState(false)

  // makes GET request to player API endpoint, grabs data of player, opens modal, and clears input field
  const handleSubmit = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${searchValue}`)
      .then((data) => {
        setPlayerData(data.data.data)
      })
      setShow(true)
      setSearchValue('')
  }


  // toggles visablity of player modal
  const handleModal = () => {
    setShow(prev => !prev)
  }

  // handles user input in the search bar
  const handleChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value)
  }

  return (
    <div className="container">
      <div className='Title'>NBA TEAMS</div>
      <form onSubmit={handleSubmit}>
      <div className='searchInput'>
        <input type="text" placeholder="Search NBA player..." value={searchValue} onChange={handleChange} data-testid="input"/>
          <button type="submit" className="searchIcon">
            <SearchIcon/>
          </button>
          </div>
      </form>
      <PlayerModal playerData={playerData[0]} show={show} handleModal={handleModal}/>
    </div>
  )
}

export default Header
