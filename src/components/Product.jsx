import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { changeProductActivity } from '../store/roomSlice';
import store from '../store/store';

export default function Product(props) {

    const [status, setStatus] = useState("Off")
    const productData = useSelector(state => store.getState().rooms.rooms[props.roomIndex].roomProducts[props.productIndex]) 

    useEffect(()=>{
        if (productData.active === true)
        {
            setStatus("On");
            if (productData.product === "stereo")
                document.getElementById("myAudio").play()
        }
      }, [])

      const setBGColor = () => {
        if (productData.active === true)
            return "chartreuse";
        return "red";
    }

    const updateProduct = () => {
        store.dispatch(changeProductActivity({roomIndex: props.roomIndex, productIndex: props.productIndex }))
        if (status === "Off")
        {
            setStatus("On");
            if (document.getElementById("myAudio"))
                document.getElementById("myAudio").play()
        }
        else
        {
            setStatus("Off");
            if (document.getElementById("myAudio") && productData.product === "stereo")
                document.getElementById("myAudio").pause()
        }
    }

    let productStyle = {
        backgroundColor: setBGColor(),
    };

    return (
        <div className='productStyle' onClick={updateProduct} style={productStyle}>
            <img className='productSize' src={require(`../public/${productData.product}${status}.png`)} alt={productData.product} ></img>
    
            {productData.product === "stereo" ? <div>
                <audio autoPlay={false} loop id='myAudio' src={require('../public/music/BGMNightMarket.mp3')} type='audio/mpeg'/>
            </div> 
            : null}
    
        </div>
      )
    }
