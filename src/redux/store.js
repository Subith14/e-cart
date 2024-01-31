import { configureStore } from "@reduxjs/toolkit";
import whishlistSlice from "./slice/whishlistSlice"
import cartSlice from "./slice/cartSlice";

const store = configureStore({
    reducer:{
       whishlistReducer:whishlistSlice,
       cartReducer:cartSlice
    }
})


export default store