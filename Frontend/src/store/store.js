import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice'
import adminProductsSlice from './admin/product-slice/index'
import shoppingProductSlice from './shop/product-slice/index'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsSlice,
        shopProducts: shoppingProductSlice
    }
});

export default store;