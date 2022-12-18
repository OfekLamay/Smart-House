import React from 'react'
import { useNavigate } from "react-router-dom";
import RoomPreview from './RoomPreview';
import { useSelector } from 'react-redux';
import store from '../store/store';

export default function Home() {
    const navigate = useNavigate();
    const rooms = useSelector(state => store.getState().rooms.rooms) 

  return (
    <div>
        <div className='flexboxContainerLine'>
            {rooms.map((room) => {
                return <RoomPreview key={room.name} roomInfo={room}/>
            })}
        </div>
        <br /> <br />
        <div onClick={() => navigate('/addroom')} className='addRoom'>+</div>
    </div>
  )
}
