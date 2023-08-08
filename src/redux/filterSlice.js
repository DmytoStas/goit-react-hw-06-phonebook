import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

export const filterSlice = createSlice({
  name: 'contactsFilter',
  initialState,
  reducers: {
    toggleFilter: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { toggleFilter } = filterSlice.actions;

export default filterSlice.reducer;
