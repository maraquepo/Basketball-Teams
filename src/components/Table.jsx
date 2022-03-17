import React, {useState} from 'react'
import './Table.css'
import { Card, CardGroup } from 'react-bootstrap';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Table = () => {
  const [isUp, setIsUp] = useState(false)

  const func = () => {
    setIsUp(prev => !prev)
  }

  return (
    <div className='tableContainer'>
      <CardGroup className='tableTitles'>
        <Card body>Team Name</Card>
        <Card body>City
          {isUp
          ? <ArrowDropUpIcon onClick={func} style={{cursor: 'pointer'}}/>
          : <ArrowDropDownIcon onClick={func} style={{cursor: 'pointer'}}/> }
        </Card>
        <Card body>Abbreviation</Card>
        <Card body>Conference</Card>
        <Card body>Division</Card>
      </CardGroup>
      <CardGroup className='tableData'>
        <Card body>Hawks</Card>
        <Card body>Altanta</Card>
        <Card body>ALT</Card>
        <Card body>East</Card>
        <Card body>Southeast</Card>
      </CardGroup>
      <CardGroup className='tableData'>
        <Card body>Hawks</Card>
        <Card body>Altanta</Card>
        <Card body>ALT</Card>
        <Card body>East</Card>
        <Card body>Southeast</Card>
      </CardGroup>

    </div>
  )
}

export default Table