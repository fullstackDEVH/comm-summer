import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name : "cart",
    initialState : {
        productsList : [],
        quantity : 0,
        total : 0
    },
    reducers : {
        addInCart : (state, action) => {
            const product = action.payload;
            const newProducts = [...state.productsList];
            const duplicate = newProducts.filter
            (
                item => item?.customer_select.size === product.customer_select.size 
                &&  item?.customer_select.color === product.customer_select.color
                && item._id === product._id
            );

            if(duplicate.length > 0){
                console.log(" trùng ");
                console.log(duplicate[0].price)
                state.productsList = state.productsList.filter
                (   item =>
                    item?.customer_select.size !== product.customer_select.size ||
                    item?.customer_select.color !== product.customer_select.color ||
                    item._id !== product._id 
                )

                state.productsList = [
                    ...state.productsList,
                    {   
                        ...product,
                        customer_select : {
                            ...duplicate[0].customer_select,
                            quantity : duplicate[0].customer_select.quantity + product.customer_select.quantity
                        },
                        _id : duplicate[0]._id,
                        

                    }
                ]
                
            }else{
                console.log("không trùng")
                state.productsList = [
                    ...state.productsList,
                    product
                ]
            }
            
          
            // const duplicate = newProducts.filter(product => product.size === )
        }
    }
})

const {actions, reducer} = slice;

export const {addInCart} = actions;
export default reducer;