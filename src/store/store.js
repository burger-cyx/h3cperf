// store.js
import { configureStore } from '@reduxjs/toolkit';
import isDisabledReducer from './index';

export const store = configureStore({
  reducer: {
    isDisabled: isDisabledReducer,
  },
});