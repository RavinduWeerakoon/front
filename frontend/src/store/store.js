import {configureStore, combineReducers} from '@reduxjs/toolkit';
import authReducer from './authSlice';

import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
import { persistReducer } from 'redux-persist';
const rootReducer = combineReducers({
    auth: authReducer
});
const persistConfig = {
    key: "root",
    storage,
    version: 1
};

const persistedState = persistReducer(persistConfig, rootReducer);
export const store= configureStore({
    
        reducer: persistedState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        })
    
});

export const persistor = persistStore(store);