import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  id: number;
  surname: string;
  email: string;
  phone: string;
  nick: string;
  register_date:string
  followed_persons:Array<number>
  followers:number
}

const initialState = {
  id: -1,
  surname: "",
  email: "",
  phone: "",
  nick: "",
  register_date:"",
  followed_persons:[-1],
  followers:0
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
      state.register_date = action.payload.register_date
      state.followed_persons = action.payload.followed_persons
      state.followers = action.payload.followers
    },
    unsetUserData: (state) => {
      state.id = -1
      state.surname = ""
      state.email = ""
      state.phone = ""
      state.nick = ""
      state.register_date=""
      state.followed_persons=[-1]
      state.followers=0
    },
  },
});

export const { setUserData, unsetUserData } = userDataSlicer.actions;

export default userDataSlicer.reducer;
