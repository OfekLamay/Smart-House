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
    const [errorMessage, setErrorMessage] = useState("")

    const isNameValid = e => {
        let input = e.target.value; 
        if(input.length > 0 && input.length <= 6 && onlyValidInput(input)) 
        {
            setName(input)
            setInputStyle('greenBG')
        }
        else 
        {
            setName('')
            setInputStyle('redBG')
        }
    }

    const onlyValidInput = (input) => {
        
        for (let i = 0; i < input.toString().length; i++)
        {
            if (input.codePointAt(i) <= 47 ||
            (input.codePointAt(i) >= 58 && input.codePointAt(i) <= 64) ||
            (input.codePointAt(i) >= 91 && input.codePointAt(i) <= 96) || input.codePointAt(i) >= 123)
            return false;
        }

        return true;
    }

    const createNewRoom = () => {

        if (!(onlyValidInput(document.getElementById("roomName").value.toString())))
        {
            setErrorMessage("Can't use characters that are not numbers or english letters");
            window.alert("Unable to create a room with this name");
            return;
        }

        if (name.length > 0 && name.length <= 6)
        {
            if (document.getElementById("roomSelect").value.toString() !== "")
            {
                if (props.addRoom({
                    name: name,
                    roomType: document.getElementById("roomSelect").value.toString(),
                    color: document.getElementById("chooseColor").value.toString(),
                    roomProducts: []
                })) {
                navigate('/');}
                else {
                    setErrorMessage("Choose a different name");
                }
            }
            else
            {
                setErrorMessage("Choose the room's type");
                window.alert("Choose the room's type");
            }
        }
        else
        {
            setErrorMessage("The room's name must have letters and can't be over 6 letters long");
            window.alert("Unable to create a room with this name");
        }
    }

  return (
    <div>

        <SelectPattern data={optionsData}/>
        <br /> <br />
        <input id='roomName' type="text" className={inputStyle} onChange={isNameValid} placeholder='Enter room name' />
        <br /><br />
        <div className='colorLabel'>Choose color:</div>
        <input type="color" id="chooseColor" ></input>
        <br /><br />
        <button onClick={createNewRoom} className='clickbtn'>Create</button>

        {errorMessage !== '' ? <div className='errorMessage'>{errorMessage}</div> : null}
        
    </div>
  )
}
