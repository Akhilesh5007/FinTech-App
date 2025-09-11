import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import jewelryReducer from "./slices/jewelrySlice";
import walletReducer from "./slices/walletSlice";
import transactionsReducer from "./slices/transactionsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jewelry: jewelryReducer,
    wallet: walletReducer,
    transactions: transactionsReducer
  }
});

export default store;
