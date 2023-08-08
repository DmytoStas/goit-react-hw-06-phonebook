import { combineReducers } from '@reduxjs/toolkit';

import contactsReducer from '../redux/contactsSlice';
import filterReducer from '../redux/filterSlice';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

export default rootReducer;
