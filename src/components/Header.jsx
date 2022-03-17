import React from 'react'
import "./Header.css";
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  return (
    <div className="container">
      <div className='Title'>NBA TEAMS</div>
      <div className='searchInput'>
        <input type="text" placeholder="Search team..." />
        <div className="searchIcon">
          <SearchIcon/>
        </div>
      </div>
    </div>
  )
}

export default Header