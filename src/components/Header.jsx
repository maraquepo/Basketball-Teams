import React, { useState } from 'react'
import "./Header.css";
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import PlayerModal from './PlayerModal';

const Header = () => {
  const [searchValue, setSearchValue] = useState('')
  const [playerData, setPlayerData] = useState('')
  const [show, setShow] = useState(false)

  const handleSubmit = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${searchValue}`)
      .then((data) => {
        setPlayerData(data.data.data)
      })
    setShow(true)
    setSearchValue('')
  }

  const handleModal = () => {
    setShow(prev => !prev)
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className="container">
      <div className='Title'>NBA TEAMS</div>
      <form onSubmit={handleSubmit}>
      <div className='searchInput'>
        <input type="text" placeholder="Search NBA player..." value={searchValue} onChange={handleChange}/>
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