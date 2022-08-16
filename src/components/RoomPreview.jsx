import React from 'react'
import { useNavigate } from "react-router-dom";

export default function RoomPreview(props) {

    const navigate = useNavigate()

    let roomStyle = {
        backgroundColor: props.roomInfo.color,
        fontSize: "35px",
        width: "25%",
        margin: "15px",
        fontWeight: "bold",
        cursor: "pointer",
        border: '2px solid black'
    };

  return (
    <div onClick={() => navigate(`/room${props.roomInfo.name}`)} style={roomStyle}>

        {props.roomInfo.name}
        <br />
    </div>
  )
}
