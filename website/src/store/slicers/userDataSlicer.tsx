import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  id: number;
  surname: string;
  email: string;
  phone: string;
  nick: string;
}

const initialState = {
  id: -1,
  surname: "",
  email: "",
  phone: "",
  nick: "",
};

const userDataSlicer = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.id = action.payload.id
      state.surname = action.payload.surname
      state.email = action.payload.email
      state.phone = action.payload.phone
      state.nick = action.payload.nick
    },
    unsetUserData: (state) => {
      state.id = -1
      state.surname = ""
      state.email = ""
      state.phone = ""
      state.nick = ""
    },
  },
});

export const { setUserData, unsetUserData } = userDataSlicer.actions;

export default userDataSlicer.reducer;
