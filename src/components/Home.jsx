import React from 'react'
import { useNavigate } from "react-router-dom";
import RoomPreview from './RoomPreview';

export default function Home(props) {
    const navigate = useNavigate()

  return (
    <div>
        <div className='flexboxContainerLine'>
            {props.rooms.map((room) => {
                return <RoomPreview roomInfo={room}/>
            })}
        </div>
        <br /> <br />
        <div onClick={() => navigate('/addroom')} className='addRoom'>+</div>
    </div>
  )
}
