import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import SelectPattern from './SelectPattern';

export default function AddRoom(props) {

    const navigate = useNavigate()
    const options = [
        {value: "",
        text: "Choose room type"},
        {value: "bedroom",
        text: "Bedroom"},
        {value: "bathroom",
        text: "Bathroom"},
        {value: "toilet",
        text: "Toilet"},
        {value: "kitchen",
        text: "Kitchen"}
    ]
    const optionsData = {name: 'rooms', id:'roomSelect', options: options};
    const [name, setName] = useState('')
    const [inputStyle, setInputStyle] = useState('inputLabel')

    const isNameValid = e => {
        let input = e.target.value; 
        if(input.length > 0 && input.length <= 6) {
            setName(input)
            setInputStyle('greenBG')
        } else {
            setName('')
            setInputStyle('redBG')
        }
    }

    const createNewRoom = () => {
        if (name.length > 0 && name.length <= 6)
        {
            if (document.getElementById("roomSelect").value.toString() !== "")
            {
                props.addRoom({
                    name: name,
                    roomType: document.getElementById("roomSelect").value.toString(),
                    color: document.getElementById("chooseColor").value.toString(),
                    roomProducts: []
                });
                navigate('/');
            }
            else
                window.alert("Choose the room's type");
        }
        else
            window.alert("Unable to create a room with this name");
    }

  return (
    <div>

        <SelectPattern data={optionsData}/>
        <br /> <br />
        <input type="text" className={inputStyle} onChange={isNameValid} placeholder='Enter room name' />
        <br /><br />
        <div className='colorLabel'>Choose color:</div>
        <input type="color" id="chooseColor" ></input>
        <br /><br />
        <button onClick={createNewRoom} className='clickbtn'>Create</button>
        
    </div>
  )
}
