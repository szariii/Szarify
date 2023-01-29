import { configureStore } from "@reduxjs/toolkit";

//Reducers
import loginReducer from "./slicers/loginSlicer";
import userDataReducer from "./slicers/userDataSlicer";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    userData: userDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
