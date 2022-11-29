import React from 'react'

export default function RoomPopup(props) {


    const closePopUp = () => {
        props.close();
    }

  return (
    <div id='infoPopup' className='overlay'>

        <div className='roomInfo'>
            <div className='roomCloseLabel' onClick={closePopUp}>X</div>
            <br />
            <div className='roomNameLabel'>{props.room.name}</div>
            <br /> 
            <div className='roomDataLabel'>
                <p>This room type is {props.room.roomType}.
                <br/>
                You can place a maximum of 5 items in this room.
                <br/>
                <br/>
                The items you can place in this room are:
                <br/>
                Stereo (maximum of 1)
                <br/>
                Lamp
                <br/>
                Air conditioner
                <br/>
                { props.room.roomType === "bathroom" ? "Boiler" : null }
                
                </p>
            </div>
            <br /> 
        </div>

    </div>
  )
}
