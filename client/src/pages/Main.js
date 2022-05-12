import React from 'react'
import './main.css'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = () => {
  return (
    <div >
      <div className='main_container'>
            <h1>
                BLOCK CHAIN BLOCKEXPLORE 만들기
            </h1>
            <Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{' '}
      </div>
    </div>
  )
}

export default Main