import React, {  useState } from 'react'
import '../App.css'
import moment from "moment"
import Container from 'react-bootstrap/Container';
import Row  from 'react-bootstrap/Row ';
import Col from 'react-bootstrap/Col';


function SidePanel({ team, games, selectedGame, onClose }) {

  

  return (
    <div className="overlay">
      <div  className='side-panel'>
        <button onClick={onClose}>X</button>
        <h2>{team.name}</h2>
        <hr className='separated' />
        <p><strong>Team Full Name</strong> : {team.full_name}</p>
        <p><strong>Total Games</strong>: {games.length}</p>
        {selectedGame && (
          <>
            <strong >
              <h3>Random Game</h3>
              <hr className='separated' /> 
              <div className="flex-details">
                <p >Date:
                </p>
                <span className='left-details'>{moment(selectedGame.date).utc().format('YYYY-MM-DD')}</span>
              </div>
              <div className="flex-details">
                <p>
                  Home Team :
                </p>
                  <span className='left-details'> {selectedGame.home_team.name}</span>
              </div>
              <div className="flex-details">
                <p >
                  Home Team Score :
                </p>
                   <span className='left-details'>{selectedGame.home_team_score}</span>
              </div>
              <div className="flex-details">
                <p >
                  Visitor Team :
                </p>
                  <span className='left-details'>{selectedGame.visitor_team.name}</span>
              </div>
              <div className="flex-details">
                <p >
                  Visitor Team Score :
                </p>
                  <span className='left-details'>{selectedGame.visitor_team_score}</span>
              </div>
      
            </strong>
          </>
        )}
      
      </div>
    </div>
  )
}

export default SidePanel