import React from 'react'
import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import SidePanel from './SidePanel';
import { BiSearchAlt2 } from 'react-icons/bi'


function Tables() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [page, setPage] = useState(1)
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedTeamGames, setSelectedTeamGames] = useState([])
  const [filterValue, SetFilterValue] = useState("")
  const [searchTeam, setSearchTeam] = useState([])


  // For Pagination
  const handPageClick = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= teams.length && selectedPage !== page)
      setPage(selectedPage)
  }


  // Teams API Render
  useEffect(() => {
    async function fetchTeams() {
      const response = await fetch('https://www.balldontlie.io/api/v1/teams');
      const data = await response.json();
      setTeams(data.data);
      setSearchTeam(data.data)
    }
    fetchTeams();
  }, []);

  // Teams Stat API Render
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

  // To access particular team stat
  useEffect(() => {
    if (selectedTeamId) {
      setSelectedTeam(teams.find(team => team.id === selectedTeamId));
    }
  }, [selectedTeamId, teams]);

  // Random Games 
  useEffect(() => {
    if (selectedTeamGames.length > 0) {
      const randomIndex = Math.floor(Math.random() * selectedTeamGames.length);
      setSelectedGame(selectedTeamGames[randomIndex]);
    }
  }, [selectedTeamGames]);

  // Search Filter
  const handleFilter = (e) => {
    if (e.target.value == '') {
      setTeams(searchTeam)
    } else {
      const filteredTeam = searchTeam.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
      if (filteredTeam.length > 0) {
        setTeams(filteredTeam)
      }else{
        setTeams([{
          "name":"No Data",
          "city":"No Data",
          "abbreviation":"No Data",
          "conference":"No Data",
          "division":"No Data",
          
        }
      ])
      }
    }
    SetFilterValue(e.target.value)
  }

  const handleCloseClick = () => {
    setSelectedTeam(null);

  }

  return (
    <div className="teams-table">
      <div className="search-bar">
        <BiSearchAlt2 />
        <input
          type="text"
          placeholder="Search for a team"
          onInput={(e) => handleFilter(e)}
          value={filterValue}
        />
      </div>
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
                className={team.id === selectedTeamId ? 'animate__fadeInRight' : 'animate__fadeOutRight'}

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

        <SidePanel
          team={selectedTeam}
          games={selectedTeamGames}
          selectedGame={selectedGame}
          onClose={handleCloseClick}

        />

      )}
      {
        teams.length > 0 &&
        <div className='pagination'>
          <span
            onClick={() => handPageClick(page - 1)}
            className={page > 1 ? "" : "page-disabled"}
          >
            <BiChevronLeft />
          </span>
          {
            [...Array(Math.floor(teams.length / 10))].map((_, i) => {
              return (
                <span
                  key={i}
                  className={page === i + 1 ? "page-selected" : ""}
                  onClick={() => handPageClick(i + 1)}
                >
                  {
                    i + 1
                  }
                </span>)
            })
          }

          <span
            onClick={() => handPageClick(page + 1)}
            className={page < teams.length / 10 ? "" : "page-disabled"}
          ><BiChevronRight /></span>
        </div>
      }
    </div>
  )
}

export default Tables