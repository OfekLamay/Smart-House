import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  rooms: [],
}

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
      addRoom: (state, action) => {
        state.rooms = [...state.rooms, action.payload]
      },
      addProduct: (state, action) => {

        let allRooms = [...state.rooms];
        
        // payload = {room: roomData, product: product}

        for (let i = 0; i < allRooms.length; i++)
        {
            if (allRooms[i].name === action.payload.room.name)
            {
                state.rooms[i].roomProducts.push({
                    id: state.rooms[i].roomProducts.length + 1,
                    product: action.payload.product.type,
                    active: false
                })
            }
        }
      },
      changeProductActivity: (state, action) => {

        // payload = {roomIndex, productIndex}

        state.rooms[action.payload.roomIndex].roomProducts[action.payload.productIndex] = {
            id: state.rooms[action.payload.roomIndex].roomProducts[action.payload.productIndex].id,
            product: state.rooms[action.payload.roomIndex].roomProducts[action.payload.productIndex].product,
            active: !state.rooms[action.payload.roomIndex].roomProducts[action.payload.productIndex].active
        }
      },
    },
  })


export const { addRoom, addProduct, changeProductActivity } = roomsSlice.actions

export const roomsReducer = roomsSlice.reducer
