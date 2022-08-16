import React from 'react'
import Product from './Product'
import SelectPattern from './SelectPattern';

export default function Room(props) {

    const openAddRoomPart = () => {
        document.getElementById('addItemsPart').className = 'show'
    } 

    const isProductValid = (product) => {
        // Max 1 stereo in each room
        // Boiler only in bathroom
        // Max 5 items in each room

        if (props.roomData.roomProducts.length === 5)
            return false;

        if (product.type === "boiler")
        {
            if (props.roomData.roomType === "bathroom")
                return true;
            return false;
        }
        
        if (product.type === "stereo")
        {
            let stereoCount = 0;

            for (let i = 0; i < props.roomData.roomProducts.length; i++)
                if (props.roomData.roomProducts[i].product === "stereo")
                    stereoCount++

            if (stereoCount < 1)
                return true;
            return false;
        }

        return true;
    }

    const checkAndAddProduct = () => {
        document.getElementById('addItemsPart').className = 'hide';

        if (document.getElementById("itemSelect").value === "")
        {
            window.alert("Please choose a product");
            return;
        }

        let product = {
            type: document.getElementById("itemSelect").value
        }

        if (isProductValid(product))
            props.addProduct(props.roomData, product);
        else
            window.alert("Can't add the product to this room");
    }

    const options = [
        {value: "",
        text: "Choose item"},
        {value: "Air Conditioner",
        text: "Air conditioner"},
        {value: "lamp",
        text: "Lamp"},
        {value: "stereo",
        text: "Stereo"},
        {value: "boiler",
        text: "Boiler"}
    ]
    const optionsData = {name: 'items', id:'itemSelect', options: options};

  return (
    <div>
        <div className='roomData'>
            Room Name: {props.roomData.name} <br/><br/>
            Room Type: {props.roomData.roomType} <br/><br/>
        </div>

        <div id='products' className='flexboxContainer'>
            {props.roomData.roomProducts.map((product) => {
                return <Product productInfo={product} roomData={props.roomData} toggleProduct={props.toggleProduct}/>
            })}
            <br/><br/>
        </div>

        <button onClick={openAddRoomPart} className='clickbtn'>Add product</button>
        <br/><br/>

        <div id='addItemsPart' className='hide'>
            <SelectPattern data={optionsData}/>
            <br/><br/>
            <button onClick={checkAndAddProduct} className='clickbtn'>Add</button>
        </div>
        

    </div>
  )
}
