import React from 'react'
import Product from './Product'
import { useState } from 'react';
import AddProduct from './AddProduct';
import RoomPopup from './RoomPopup';
import GeneralPopUp from './GeneralPopUp';

export default function Room(props) {

    const [showAddProduct, setShowAddProduct] = useState(false)
    const [showRoomInfo, setRoomInfo] = useState(false)
    const [showProductPopUp, setShowProductPopUp] = useState(false);
    const [popUpInfo, setPopUpInfo] = useState({
        name: "Product",
        content: <p></p>
    })

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

        if (props.roomData.roomProducts.length === 5)
            return false;
        
        if (product.type === "stereo")
        {
            for (let i = 0; i < props.roomData.roomProducts.length; i++)
                if (props.roomData.roomProducts[i].product === "stereo")
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
            props.addProduct(props.roomData, product);
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

        {showAddProduct ? <AddProduct roomType={props.roomData.roomType} checkAndAddProduct={checkAndAddProduct} /> : null}
        {showRoomInfo ? <RoomPopup close={toggleInfo} room = {props.roomData}/> : null}
        {showProductPopUp ? <GeneralPopUp close={toggleProductPopUp} info={popUpInfo} /> : null}


    </div>
  )
}
