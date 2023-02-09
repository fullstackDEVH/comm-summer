import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { userRequest, publicRequest } from "../requestMethods";

export const fetchAsyncProducts = createAsyncThunk("products/fetchAsyncProduct" , 
    async(data, thunkApi)=>{
        const res = await publicRequest.get('products/');
        return res.data;
})

export const fetchAsyncDeleteProduct = createAsyncThunk("products/deleteProduct" , 
    async(id, thunkApi)=>{
        const res = await userRequest.delete(`products/${id}`);
        return res.data;
})

export const fetchAsyncUpdateProduct = createAsyncThunk("products/updateProduct" , 
    async({newProduct, productId}, thunkApi)=>{
        const res = await userRequest.put('products/'+ productId, newProduct);
        return res.data;
})

export const fetchAsyncCreateProduct = createAsyncThunk("products/createProduct" , 
    async(data, thunkApi)=>{
        console.log(data)
        const res = await userRequest.post('products/', data);
        return res.data;
})

const slice = createSlice({
    name : "products",
    initialState : {
        isFetching : false,
        error : false ,
        products : [],
    },
    reducers : ({}),
    extraReducers : (builder =>{
        // get all
        builder.addCase(fetchAsyncProducts.pending, (state, action) =>{
            state.isFetching = true;
            state.error = false;
        })
        builder.addCase(fetchAsyncProducts.fulfilled, (state, action) =>{
            state.isFetching = false;
            state.products = action.payload;
        })
        builder.addCase(fetchAsyncProducts.rejected, (state, action) =>{
            state.isFetching = false;
            state.error = true;
        })
        // create
        builder.addCase(fetchAsyncCreateProduct.pending, (state, action) =>{
            state.isFetching = true;
            state.error = false;
        })
        builder.addCase(fetchAsyncCreateProduct.fulfilled, (state, action) =>{
            state.isFetching = false;
            state.products.push(action.payload);
        })
        builder.addCase(fetchAsyncCreateProduct.rejected, (state, action) =>{
            state.isFetching = false;
            state.error = true;
        })
        // delete 
        builder.addCase(fetchAsyncDeleteProduct.pending, (state, action) =>{
            state.isFetching = true;
            state.error = false;
        })
        builder.addCase(fetchAsyncDeleteProduct.fulfilled, (state, action) =>{
            state.isFetching = false;
            state.products = state.products.filter(item => item._id !== action.payload._id);
        })
        builder.addCase(fetchAsyncDeleteProduct.rejected, (state, action) =>{
            state.isFetching = false;
            state.error = true;
        })
        // update
        builder.addCase(fetchAsyncUpdateProduct.pending, (state, action) =>{
            state.isFetching = true;
            state.error = false;
        })
        builder.addCase(fetchAsyncUpdateProduct.fulfilled, (state, action) =>{
            state.isFetching = false;
            state.products[state.products.findIndex(item => item._id === action.payload._id)] = action.payload;
        })
        builder.addCase(fetchAsyncUpdateProduct.rejected, (state, action) =>{
            state.isFetching = false;
            state.error = true;
        })
    })
})

const {reducer, actions} = slice;
export default reducer;