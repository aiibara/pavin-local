import cartReducer from '@/features/cart/cartSlice';
import configReducer from '@/features/config/configSlice';
import invoiceReducer from '@/features/invoice/invoiceSlice';
import productReducer from '@/features/product/productSlice';
import { configureStore } from '@reduxjs/toolkit';
import { MMKV } from "react-native-mmkv";
import { combineReducers } from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
  Storage
} from "redux-persist";

const storage = new MMKV();

const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: async (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    storage.delete(key);
    return Promise.resolve();
  },
};
// ...


const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['product']
};
const reducers = combineReducers({
  product: productReducer,
  config: configReducer,
  cart: cartReducer,
  invoices: invoiceReducer
});


const persistedReducer = persistReducer(persistConfig, reducers);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch