import React from 'react'
import { useState, useEffect } from 'react';

export default function Product(props) {

    const [status, setStatus] = useState("Off")

    useEffect(()=>{
        if (props.productInfo.active === true)
            setStatus("On");
      },[props.productInfo.active])

    const setBGColor = () => {
        if (props.productInfo.active === true)
            return "chartreuse";
        return "red";
    }

    const updateProduct = () => {
        props.toggleProduct(props.roomData, props.productInfo)
        if (status === "Off")
            setStatus("On");
        else
            setStatus("Off");
    }

    let productStyle = {
        backgroundColor: setBGColor(),
    };

  return (
    <div className='productStyle' onClick={updateProduct} style={productStyle}>
        <img className='productSize' src={require(`../public/${props.productInfo.product}${status}.png`)} alt={props.productInfo.product} ></img>
        
    </div>
  )
}
