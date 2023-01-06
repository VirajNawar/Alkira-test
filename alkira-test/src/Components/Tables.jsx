import React from 'react'
import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';


function Tables() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [page, setPage] = useState(1)

  const handleRowClick = (team) => {
    setSelectedTeam(team);
  };

  const handPageClick = (selectedPage) => {
    setPage(selectedPage)
  }
  const fetchData = async () => {
    const res = await fetch("https://www.balldontlie.io/api/v1/teams")
    const data = await res.json()
    setTeams(data.data)
  }
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className="teams-table">
      <Table responsive="sm">
        <thead>
          <tr className='table__row'>
            <th>Team Name</th>
            <th>City</th>
            <th>Abbreviation</th>
            <th>Conference</th>
            <th>Division</th>
          </tr>
        </thead>
        <tbody>
          {teams.slice(
            page * 10 - 10, page * 7).map((team) => (
              <tr
                key={team.id}
                onClick={() => handleRowClick(team)}
                className={selectedTeam === team ? "selected" : ""}
              >
                <td>{team.name}</td>
                <td>{team.city}</td>
                <td>{team.abbreviation}</td>
                <td>{team.conference}</td>
                <td>{team.division}</td>
              </tr>
            ))}
        </tbody>
        {selectedTeam && (
          <div className="side-panel">
            <h1>{selectedTeam.full_name}</h1>
            <p>Location: {selectedTeam.city}</p>
            <h2>Games</h2>
            {/* pick a random game and display its information */}
            <p>Game: {selectedTeam.games.city}</p>
            <p>Opponent: {selectedTeam.games.abbreviation}</p>
            <p>Date: {selectedTeam.games.division}</p>
          </div>
        )}
      </Table>
      {
        teams.length > 0 &&
        <div className='pagination'>
          <span>
            <BiChevronLeft />
          </span>
          {
            [...Array(Math.floor(teams.length /10))].map((_, i) => {
              return <span
               key={i} 
               onClick={()=>handPageClick(i+1)}
               >
                {
                i + 1
                }
                </span>
            })
          }

          <span><BiChevronRight /></span>
        </div>
      }
    </div>
  )
}

export default Tables