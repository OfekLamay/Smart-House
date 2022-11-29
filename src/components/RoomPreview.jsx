import React from 'react'
import { useNavigate } from "react-router-dom";

export default function RoomPreview(props) {

    const navigate = useNavigate()

    let roomStyle = {
        backgroundColor: props.roomInfo.color,
    };

  return (
    <div className='roomPreview' onClick={() => navigate(`/room${props.roomInfo.name}`)} style={roomStyle}>
        {props.roomInfo.name}
    </div>
  )
}
