import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slices/sidebarSlice"
import categoryReducer from "./slices/categorySlice";
import ProductReducer from "./slices/ProductSlice";
import cartReducer from "./slices/cartSlice";
import searchReducer from "./slices/searchSlice";

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        category: categoryReducer,
        product: ProductReducer,
        cart: cartReducer,
        search: searchReducer,
    }
})


export default store;