import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


const initialState = {
    isLoading: false,
    productList: [],
}

export const addNewProduct = createAsyncThunk('/products/addNewProduct',
    async (formData) => {
        const result = await axios.post('http://localhost:3000/api/admin/products/add', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return result.data;
    }
);

export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts',
    async () => {
        const result = await axios.get('http://localhost:3000/api/admin/products/get', {
            withCredentials: true,
        });
        return result.data;
    }
);

export const editProduct = createAsyncThunk('/products/editProduct',
    async ({ id, formData }) => {
        console.log(id, formData);
        const result = await axios.put(`http://localhost:3000/api/admin/products/edit/${id}`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return result.data;
    }
);

export const deleteProduct = createAsyncThunk('/products/deleteProduct',
    async (id) => {
        const result = await axios.delete(`http://localhost:3000/api/admin/products/delete/${id}`, {
            withCredentials: true,
        });
        return result.data;
    }
);

const adminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchAllProducts.fulfilled, (state, action) => {
            // console.log(action.payload);

            state.isLoading = false,
            state.productList = action.payload.data
        }).addCase(fetchAllProducts.rejected, (state, action) => {
            state.isLoading = false,
            state.productList = []
        })
    }
});

export default adminProductsSlice.reducer