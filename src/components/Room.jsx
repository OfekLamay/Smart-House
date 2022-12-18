import React from 'react'
import Product from './Product'
import { useState } from 'react';
import AddProduct from './AddProduct';
import RoomPopup from './RoomPopup';
import GeneralPopUp from './GeneralPopUp';
import store from '../store/store';
import { addProduct } from '../store/roomSlice';
import { useSelector } from 'react-redux'

export default function Room(props) {

    const [showAddProduct, setShowAddProduct] = useState(false)
    const [showRoomInfo, setRoomInfo] = useState(false)
    const [showProductPopUp, setShowProductPopUp] = useState(false);
    const [popUpInfo, setPopUpInfo] = useState({
        name: "Product",
        content: <p></p>
    })
    const roomData = useSelector(state => store.getState().rooms.rooms[props.index]) 

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

    const toggleProductPopUp = () => {
        setShowProductPopUp(!showProductPopUp)
    }

    const isProductValid = (product) => {
        // Max 1 stereo in each room
        // Boiler only in bathroom - not an option unless the room's type is bathroom
        // Max 5 items in each room

        if (roomData.roomProducts.length === 5)
            return false;
        
        if (product.type === "stereo")
        {
            for (let i = 0; i < roomData.roomProducts.length; i++)
                if (roomData.roomProducts[i].product === "stereo")
                    return false

            return true;
        }

        return true;
    }

    const checkAndAddProduct = () => {

        if (document.getElementById("itemSelect").value === "")
        {
            setPopUpInfo({
                name: "Error!",
                content: <p>Please choose a product.</p>
            })
            setShowProductPopUp(true);
            return;
        }

        let product = {
            type: document.getElementById("itemSelect").value
        }

        if (isProductValid(product))
        {
            store.dispatch(addProduct({room: roomData, product: product}))
            setPopUpInfo({
                name: "Product Added!",
                content: <p>Product added successfully!</p>
            })
            setShowProductPopUp(true);
        }
        else
        {
            setPopUpInfo({
                name: "Error!",
                content: <p>Can't add the product to this room.</p>
            })
            setShowProductPopUp(true);
        }
    }

  return (
    <div>
        <div className='roomData'>
            Room Name: {roomData.name} <br/><br/>
            <button className='clickNav' onClick={toggleInfo}>Help</button> <br/><br/>
            Room Type: {roomData.roomType} <br/>
        </div>

        <div id='products' className='flexboxContainer'>
            {roomData.roomProducts.map((product, index) => {
                return <Product key={product.id} productIndex={index} roomIndex={props.index} />
            })}
            <br/><br/>
        </div>

        <button id='addProductBtn' onClick={toggleAddRoomPart} className='clickbtn'>Add product</button>
        <br/><br/>

        {showAddProduct ? <AddProduct roomType={props.roomData.roomType} checkAndAddProduct={checkAndAddProduct} /> : null}
        {showRoomInfo ? <RoomPopup close={toggleInfo} room = {props.roomData}/> : null}
        {showProductPopUp ? <GeneralPopUp close={toggleProductPopUp} info={popUpInfo} /> : null}


    </div>
  )
}
