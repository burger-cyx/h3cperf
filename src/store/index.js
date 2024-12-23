import { createSlice } from "@reduxjs/toolkit";

const isDisabledSlice = createSlice({
    name: 'isDisabled',
    initialState: {
      gpu: false,
      stage: false
    },
    reducers: {
      setGpu: (state, action) => {
        // 切换 isDisabled 的状态
        state.gpu = action.payload
      },
      setStage: (state, action) => {
        // 切换 isDisabled 的状态
        state.stage = action.payload
      },
    },
  });

export const { setGpu, setStage } = isDisabledSlice.actions;
export default isDisabledSlice.reducer;