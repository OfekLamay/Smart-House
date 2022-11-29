import './App.css';
import {useState} from 'react';
import {HashRouter as Router, Routes , Route} from 'react-router-dom';

// components
import Home from './components/Home';
import Header from './components/Header';
import NavBar from './components/NavBar';
import AddRoom from './components/AddRoom';
import Room from './components/Room';

function App() {

  const [rooms, setRooms] = useState([]);

  const addRoom = (room) => {

    // Check if the name is not a duplicate
    for (let i = 0; i< rooms.length; i++)
    {
      if (rooms[i].name === room.name)
      {
        window.alert("There is already a room with this name, please choose a different name");
        return;
      }
    }

    // Name is OK
    setRooms([...rooms, room]);
    window.alert("Room added!")
  };

  const addProduct = (room, product) => {
    // If the method was called then the product can be added

    let roomPosition, roomProducts = [], allRooms = rooms;

    for (let i = 0; i< allRooms.length; i++)
    {
      if (allRooms[i].name === room.name)
      {
        roomPosition = i;
        roomProducts = allRooms[i].roomProducts;
      }
    }

    let newProduct = {
      id: roomProducts.length + 1,
      product: product.type,
      active: false
    };

    roomProducts.push(newProduct);

    allRooms[roomPosition] = {
      name: allRooms[roomPosition].name,
      roomType: allRooms[roomPosition].roomType,
      color: allRooms[roomPosition].color,
      roomProducts: roomProducts
    };

    setRooms([...allRooms]);
    window.alert("Product added!")
  };

  const changeProductActivity = (room, product) => {
    let roomPosition, roomProducts = [], allRooms = rooms, changedProduct;

    for (let i = 0; i< allRooms.length; i++)
    {
      if (allRooms[i].name === room.name)
      {
        roomPosition = i;
        roomProducts = allRooms[i].roomProducts;
      }
    }

    for (let i = 0; i< roomProducts.length; i++)
    {
      if (roomProducts[i].id === product.id)
      {
        changedProduct = {
          id: roomProducts[i].id,
          product: product.product,
          active: !product.active
        }
        roomProducts[i] = changedProduct;
        i= roomProducts.length;
      }
    }

    allRooms[roomPosition] = {
      name: allRooms[roomPosition].name,
      roomType: allRooms[roomPosition].roomType,
      color: allRooms[roomPosition].color,
      roomProducts: roomProducts
    };

    setRooms([...allRooms]);
    return;
  }

  return (
    <div className="App">
      <Header title={"Smart House"}/>
      <Router>
        <NavBar />
        <Routes>
          {rooms.map((room) => {
            return <Route key={room.name} path={`/room${room.name}`} element={<Room roomData={room} addProduct={addProduct} toggleProduct={changeProductActivity}/>} />
          })}
          <Route path={'/'} element={<Home rooms={rooms}/>} />
          <Route path={'/addroom'} element={<AddRoom addRoom={addRoom} />} />
        </Routes>
      </Router>
    </div>  
  );
}

export default App;