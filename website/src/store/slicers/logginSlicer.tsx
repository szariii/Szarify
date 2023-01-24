import { createSlice } from "@reduxjs/toolkit";

const initialState: LogginValue = {
  value: false,
};

export const logginSlicer = createSlice({
  name: "counter",
  initialState,
  reducers: {
    change: (state) => {
      state.value = !state.value;
    },
  },
});

export interface LogginValue {
  value: boolean;
}

export const { change } = logginSlicer.actions;

export default logginSlicer.reducer;
