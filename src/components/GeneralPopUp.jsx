import React from 'react'

export default function GeneralPopUp(props) {

    // close = {f()}
    // info ={
    // name: ""
    // content: <p>ACTUAL CONTENT</p>
    // }

    const closePopUp = () => {
        props.close();
    }

  return (
    <div id='infoPopup' className='overlay' onClick={closePopUp}>
        <div className='roomInfo'>
            <div className='roomNameLabel' onClick={(e) => {e.stopPropagation()}}>{props.info.name}</div>
            <br /> 
            <div className='roomDataLabel' onClick={(e) => {e.stopPropagation()}}>
                <div className='roomCloseLabel' onClick={closePopUp}>X</div>
                {props.info.content}
            </div>
        </div>
    </div>
  )
}
