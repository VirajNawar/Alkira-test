import React from 'react'
import '../App.css'
import moment from "moment"

function SidePanel({ team, games, selectedGame }) {
  return (
    <div className="side-panel">
      <h2>{team.name}</h2>
      <p><strong>Team Full Name</strong> : {team.full_name}</p>
      <p><strong>Total Games</strong>: {games.length}</p>
      {selectedGame && (
        <>
          <strong>
            <h3>Random Game</h3>
            <p>Date: {moment(selectedGame.date).utc().format('YYYY-MM-DD')}</p>
            <p>
              Home Team : {selectedGame.home_team.name}
            </p>
            <p>
              Home Team Score : {selectedGame.home_team_score}
            </p>
            <p>
              Visitor Team : {selectedGame.visitor_team.name}
            </p>
            <p>
              Visitor Team Score : {selectedGame.visitor_team_score}
            </p>
          </strong>
        </>
      )}

    </div>
  )
}

export default SidePanel