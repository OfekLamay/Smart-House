import './App.css';
import {HashRouter as Router, Routes , Route} from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from './store/store';

// components
import Home from './components/Home';
import Header from './components/Header';
import NavBar from './components/NavBar';
import AddRoom from './components/AddRoom';
import Room from './components/Room';

function App() {

  if((new Date().getHours()) > 20 || (new Date().getHours()) < 7)
  {
    document.body.style.background = "rgb(84, 147, 151)";
  }

  const rooms = useSelector(state => store.getState().rooms.rooms) 

  return (
    <div className="App">
      <Header title={"Smart House"}/>
      <Router>
        <NavBar />
        <Routes>
          {rooms.map((room, index) => {
            return <Route key={room.name} path={`/room${room.name}`} element={<Room index={index} roomData={room} />} />
          })}
          <Route path={'/'} element={<Home />} />
          <Route path={'/addroom'} element={<AddRoom />} />
        </Routes>
      </Router>
    </div>  
  );
}

export default App;