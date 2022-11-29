import React from 'react'
import Product from './Product'
import { useState } from 'react';
import AddProduct from './AddProduct';
import RoomPopup from './RoomPopup';

export default function Room(props) {

    const [showAddProduct, setShowAddProduct] = useState(false)
    const [showRoomInfo, setRoomInfo] = useState(false)

    const toggleAddRoomPart = () => {
        if (!showAddProduct)
        {
            document.getElementById("addProductBtn").innerHTML = 'Close add product'
        }
        else
        {
            document.getElementById("addProductBtn").innerHTML = 'Add product'
        }
        setShowAddProduct(!showAddProduct);
    } 

    const toggleInfo = () => {
        setRoomInfo(!showRoomInfo);
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

  return (
    <div>
        <div className='roomData'>
            Room Name: {props.roomData.name} <br/><br/>
            <button className='clickNav' onClick={toggleInfo}>Help</button> <br/><br/>
            Room Type: {props.roomData.roomType} <br/>
        </div>

        <div id='products' className='flexboxContainer'>
            {props.roomData.roomProducts.map((product) => {
                return <Product key={product.id} productInfo={product} roomData={props.roomData} toggleProduct={props.toggleProduct}/>
            })}
            <br/><br/>
        </div>

        <button id='addProductBtn' onClick={toggleAddRoomPart} className='clickbtn'>Add product</button>
        <br/><br/>

        {showAddProduct ? <AddProduct checkAndAddProduct={checkAndAddProduct} /> : null}
        {showRoomInfo ? <RoomPopup close={toggleInfo} room = {props.roomData}/> : null}

    </div>
  )
}
