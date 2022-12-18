import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { addRoom } from '../store/roomSlice';
import store from '../store/store';
import GeneralPopUp from './GeneralPopUp';
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
    const [name, setName] = useState('');
    const [inputStyle, setInputStyle] = useState('inputLabel');
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorPopUp, setShowErrorPopUp] = useState(false);
    const [showRoomAdded, setShowRoomAdded] = useState(false);
    const [popUpInfo, setPopUpInfo] = useState({
        name: "Error!",
        content: <p></p>
    });

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

    const toggleError = () => {
        setShowErrorPopUp(!showErrorPopUp)
    }

    const createNewRoom = () => {

        if (!(onlyValidInput(document.getElementById("roomName").value.toString())))
        {
            setErrorMessage("Can't use characters that are not numbers or english letters");
            setShowErrorPopUp(true);
            setPopUpInfo({
                name: "Error!",
                content: <p>Can't use characters that are not numbers or english letters.
                    <br/> Please choose a name with only english characters and/ or numbers.
                </p>
            })
            return;
        }

        if (name.length > 0 && name.length <= 6)
        {
            if (document.getElementById("roomSelect").value.toString() !== "")
            {
                if (props.addRoom({
                    name: name,
                })) {
                store.dispatch(addRoom({
                    name: name,
                    roomType: document.getElementById("roomSelect").value.toString(),
                    color: document.getElementById("chooseColor").value.toString(),
                    roomProducts: []
                })) 
                setShowRoomAdded(true);
                setPopUpInfo({
                    name: "Room Added!",
                    content: <p>Room added successfully!
                        <br/> Exit to go back to the home screen.
                    </p>
                })
                }
                else {
                setShowErrorPopUp(true);
                setPopUpInfo({
                    name: "Error!",
                    content: <p>This name is already being used.
                        <br/> Please use a different name.
                    </p>
                })
                setErrorMessage("Choose a different name");
                }
            }
            else
            {
                setPopUpInfo({
                    name: "Error!",
                    content: <p>You must choose the room's type.
                    </p>
                })
                setErrorMessage("Choose the room's type");
                setShowErrorPopUp(true);
            }
        }
        else
        {
            setPopUpInfo({
                name: "Error!",
                content: <p>You can't use this name.
                    <br/> Please choose a name that uses only english letters and numbers and that its length isn't more than 6.
                </p>
            })
            setShowErrorPopUp(true);
            setErrorMessage("The room's name must have letters and can't be over 6 letters long");
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
        {showErrorPopUp ? <GeneralPopUp info={popUpInfo} close={toggleError} /> : null}
        {showRoomAdded ? <GeneralPopUp info={popUpInfo} close={()=>{navigate('/')}} /> : null}
        
    </div>
  )
}
