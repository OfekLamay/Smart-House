import React from 'react'
import { useState, useEffect } from 'react';

export default function Product(props) {

    const [status, setStatus] = useState("Off")

    useEffect(()=>{
        if (props.productInfo.active === true)
            setStatus("On");
            if (props.productInfo.product === "stereo")
                document.getElementById("myAudio").play()
      },[])

    const setBGColor = () => {
        if (props.productInfo.active === true)
            return "chartreuse";
        return "red";
    }

    const updateProduct = () => {
        props.toggleProduct(props.roomData, props.productInfo)
        if (status === "Off")
        {
            setStatus("On");
            if (document.getElementById("myAudio"))
                document.getElementById("myAudio").play()
        }
        else
        {
            setStatus("Off");
            if (document.getElementById("myAudio") && props.productInfo.product === "stereo")
                document.getElementById("myAudio").pause()
        }
    }

    let productStyle = {
        backgroundColor: setBGColor(),
    };

  return (
    <div className='productStyle' onClick={updateProduct} style={productStyle}>
        <img className='productSize' src={require(`../public/${props.productInfo.product}${status}.png`)} alt={props.productInfo.product} ></img>

        {props.productInfo.product === "stereo" ? <div>
            <audio loop id='myAudio' src={require('../public/music/BGMNightMarket.mp3')} type='audio/mpeg'/>
        </div> 
        : null}

    </div>
  )
}
