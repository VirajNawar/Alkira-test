import React from 'react'
import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import SidePanel from './SidePanel';


function Tables() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [page, setPage] = useState(1)
  const [selectedTeamId, setSelectedTeamId] = useState(null);  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedTeamGames, setSelectedTeamGames] = useState([]);

  const handPageClick = (selectedPage) => {
    setPage(selectedPage)
  }



  useEffect(() => {
    async function fetchTeams() {
      const response = await fetch('https://www.balldontlie.io/api/v1/teams');
      const data = await response.json();
      setTeams(data.data);
    }
    fetchTeams();
  }, []);

  useEffect(() => {
    async function fetchTeamGames() {
      const response = await fetch(
        `https://www.balldontlie.io/api/v1/games?seasons[]=2021&team_ids[]=${selectedTeamId}`
      );
      const data = await response.json()
      setSelectedTeamGames(data.data);
    }
    if (selectedTeamId) {
      fetchTeamGames();
    }
  }, [selectedTeamId]);

  useEffect(() => {
    if (selectedTeamId) {
      setSelectedTeam(teams.find(team => team.id === selectedTeamId));
    }
  }, [selectedTeamId, teams]);


  useEffect(() => {
    if (selectedTeamGames.length > 0) {
      const randomIndex = Math.floor(Math.random() * selectedTeamGames.length);
      setSelectedGame(selectedTeamGames[randomIndex]);
    }
  }, [selectedTeamGames]);

  function handleTeamClick(team) {
    setSelectedTeam(team);
  }

  function handleGameClick(game) {
    setSelectedGame(game);
  }

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
            page * 10 - 10, page * 10).map((team) => (
              <tr
                key={team.id}
                onClick={() => setSelectedTeamId(team.id)}
                className={team.id === selectedTeamId ? 'selected' : ''}
                
              >
                <td>{team.name}</td>
                <td>{team.city}</td>
                <td>{team.abbreviation}</td>
                <td>{team.conference}</td>
                <td>{team.division}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      {selectedTeam && (
        <SidePanel team={selectedTeam} 
        games={selectedTeamGames}
        selectedGame={selectedGame} 
        />
      )}
      {
        teams.length > 0 &&
        <div className='pagination'>
          <span>
            <BiChevronLeft />
          </span>
          {
            [...Array(Math.floor(teams.length / 10))].map((_, i) => {
              return <span
                key={i}
                onClick={() => handPageClick(i + 1)}
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