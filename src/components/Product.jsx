import React from 'react'
import { useState, useEffect } from 'react';

export default function Product(props) {

    const [status, setStatus] = useState("Off")

    useEffect(()=>{
        if (props.productInfo.active === true)
        setStatus("On");
      })

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
        fontSize: "20px",
        margin: "15px",
        fontWeight: "bold",
        borderRadius: "20px",
        cursor: "pointer",
        backgroundColor: setBGColor(),
    };

  return (
    <div onClick={updateProduct} style={productStyle}>
        <img src={require(`../public/${props.productInfo.product}${status}.png`)} alt='lamp' width={100}></img>
        {/* {props.productInfo.product} */}
        
    </div>
  )
}
