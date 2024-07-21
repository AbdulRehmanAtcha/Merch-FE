import { createSlice } from "@reduxjs/toolkit";

export const myReducer = createSlice({
    name: "myReducer",
    initialState: {
        products: [],
        cart: [],
        totalItems: 0,
        totalPrice: 0
    },
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
        },
        addToCart(state, action) {
            const { productImage, productName, productFinalPrice, _id } = action.payload;
            const existingItemIndex = state.cart.findIndex(item => item._id === _id);

            if (existingItemIndex !== -1) {
                state.cart[existingItemIndex].quantity++;
                state.totalPrice += productFinalPrice;
            } else {
                state.cart.push({ productImage, productName, productFinalPrice, _id, quantity: 1 });
                state.totalItems++;
                state.totalPrice += productFinalPrice;
            }
        },
        decrementFromCart(state, action) {
            const { _id } = action.payload;
            const existingItem = state.cart.find(item => item._id === _id);

            if (!existingItem) {
                return state;
            }

            if (existingItem.quantity === 1) {
                return {
                    ...state,
                    cart: state.cart.filter(item => item._id !== _id),
                    totalItems: state.totalItems - 1,
                    totalPrice: state.totalPrice - existingItem.productFinalPrice
                };
            } else {
                return {
                    ...state,
                    cart: state.cart.map(item => {
                        if (item._id === _id) {
                            return { ...item, quantity: item.quantity - 1 };
                        }
                        return item;
                    }),
                    // totalItems: state.totalItems - 1,
                    totalPrice: state.totalPrice - existingItem.productFinalPrice
                };
            }
        }
    }
})

export const { setProducts, addToCart, decrementFromCart } = myReducer.actions;

// Reducer function
export default myReducer.reducer;