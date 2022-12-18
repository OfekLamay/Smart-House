import { configureStore } from '@reduxjs/toolkit'
import { roomsReducer } from './roomSlice'

const store = configureStore({
    reducer: {
      rooms: roomsReducer,
    },
  })

  export default store