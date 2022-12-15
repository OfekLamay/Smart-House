import React from 'react'
import SelectPattern from './SelectPattern';

export default function AddProduct(props) {

    const options = [
        {value: "",
        text: "Choose item"},
        {value: "Air Conditioner",
        text: "Air conditioner"},
        {value: "lamp",
        text: "Lamp"},
        {value: "stereo",
        text: "Stereo"},
        // {value: "boiler",
        // text: "Boiler"}
    ]

    if (props.roomType === 'bathroom')
      options.push({value: "boiler", text: "Boiler"});

    const optionsData = {name: 'items', id:'itemSelect', options: options};

  return (
    <div>
        <div id='addItemsPart' >
            <SelectPattern data={optionsData}/>
            <br/><br/>
            <button onClick={props.checkAndAddProduct} className='clickbtn'>Add</button>
        </div>
    </div>
  )
}
