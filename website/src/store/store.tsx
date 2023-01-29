import { configureStore } from '@reduxjs/toolkit'

//Reducers
import logginReducer from "./slicers/logginSlicer"
import userDataReducer from './slicers/userDataSlicer'

export const store = configureStore({
    reducer: {
      loggin: logginReducer,
      userData: userDataReducer
    },
  })

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch