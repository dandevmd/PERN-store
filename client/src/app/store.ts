import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './reducers/auth/authSlice';
import shopReducer from './reducers/shop/shopSlice';

export const store = configureStore({
  reducer:{
    auth: authReducer,
    shop: shopReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
