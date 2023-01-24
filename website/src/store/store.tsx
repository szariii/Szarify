import { configureStore } from '@reduxjs/toolkit'

//Reducers
import logginReducer from "./slicers/logginSlicer"

export const store = configureStore({
    reducer: {
      loggin: logginReducer
    },
  })

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch