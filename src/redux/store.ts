


import { combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, Persistor } from 'redux-persist';
import { configureStore as configureStoreRTK } from '@reduxjs/toolkit';
import categorySlice from './slices/categorySlice';
import sellSummariesSlice from './slices/sellSummariesSlice';
import recentClientSlice from './slices/allApiSlice';

// RootState and AppDispatch declarations

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
    categories:categorySlice,
    sellSummaries: sellSummariesSlice,
    recentClients: recentClientSlice,
}));

const store = configureStoreRTK({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppPersistor = Persistor;

export const persistor = persistStore(store);

export default store;

