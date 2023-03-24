import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice'
import cartReducer from './cartSlice'
import { persistReducer  } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key : 'persist-store' , 
    version : 1,
    storage
}

const reducer = combineReducers({
    product : productReducer,
    cart  : cartReducer 
})

const persistedReducer = persistReducer(persistConfig , reducer) 


const store = configureStore({
    reducer : persistedReducer
})

export default store