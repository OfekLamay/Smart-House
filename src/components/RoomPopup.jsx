import React from 'react'

export default function RoomPopup(props) {


    const closePopUp = () => {
        props.close();
    }

  return (
    <div id='infoPopup' className='overlay' onClick={closePopUp}>
        <div className='roomInfo'>
            <div className='roomNameLabel' onClick={(e) => {e.stopPropagation()}}>{props.room.name}</div>
            <br /> 
            <div className='roomDataLabel' onClick={(e) => {e.stopPropagation()}}>
                <div className='roomCloseLabel' onClick={closePopUp}>X</div>
                <p>This room type is {props.room.roomType}.
                <br/>
                You can place a maximum of 5 items in this room.
                <br/>
                <br/>
                The items you can place in this room are:
                <br/>
                Stereo (maximum of 1)
                <br/>
                Lamps
                <br/>
                Air conditioners
                <br/>
                { props.room.roomType === "bathroom" ? "Boilers" : null }
                
                </p>
            </div>
        </div>
    </div>
  )
}
