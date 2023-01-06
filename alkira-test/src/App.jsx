
import './App.css'
import {BiSearchAlt2} from 'react-icons/bi' 
import Tables from './Components/Tables';

function App() {


  return (
    <div className="App">
      <h1 className='main__heading'>nba teams</h1>
      <div className="search-bar">
          <BiSearchAlt2 />
        <input type="text" placeholder="Search for a team" />
      </div>
     <Tables />
    </div>
  );

}



export default App
