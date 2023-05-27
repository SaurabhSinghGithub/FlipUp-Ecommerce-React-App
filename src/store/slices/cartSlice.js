import { createSlice } from "@reduxjs/toolkit";

const storeInLocalStorage = (data) => {

    return localStorage.setItem("cart", JSON.stringify(data))

}

const fetchFromLocalStorage = () => {

    const cartItems = localStorage.getItem("cart");

    const parsedItems = JSON.parse(cartItems);

    if (!Array.isArray(parsedItems)) {
        return []
    } else {

        return parsedItems;

    }
}

const initialState = {
    carts: fetchFromLocalStorage(),
    itemsCount: 0,
    totalAmount: 0,
    isCartMessageOn: false,
    // carts: [],
}

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log(action.payload)
            const itemExist = state.carts.find((item) => {
                return item.id === action.payload.id
            })
            if (itemExist) {
                const tempCart = state.carts.map((item) => {
                    if (item.id === action.payload.id) {
                        const { quantity } = action.payload;
                        let tempQuantity = item.quantity + quantity;
                        let tempTotalPrice = item.discountedPrice * tempQuantity;

                        if (tempQuantity >= item.stock) {
                            tempQuantity = item.stock
                            tempTotalPrice = item.discountedPrice * tempQuantity;
                        }

                        return {
                            ...item,
                            quantity: tempQuantity,
                            totalPrice: tempTotalPrice,
                        }
                    } else {
                        return item
                    }
                })
                state.carts = tempCart;
                storeInLocalStorage(state.carts)
            } else {

                state.carts.push(action.payload)
                storeInLocalStorage(state.carts)
            }
        },
        toggleCartQty: (state, action) => {
            const tempCart = state.carts.map(item => {
                if (item.id === action.payload.id) {
                    let tempQty = item.quantity;
                    let tempTotalPrice = item.totalPrice;

                    if (action.payload.type === "INC") {
                        tempQty++;
                        if (tempQty >= item.stock) tempQty = item.stock;
                        tempTotalPrice = tempQty * item.discountedPrice;
                    }

                    if (action.payload.type === "DEC") {
                        tempQty--;
                        if (tempQty <= 1) tempQty = 1;
                        tempTotalPrice = tempQty * item.discountedPrice;
                    }

                    return { ...item, quantity: tempQty, totalPrice: tempTotalPrice };
                } else {
                    return item;
                }
            });

            state.carts = tempCart;
            storeInLocalStorage(state.carts);
        },
        removeSingleCart: (state, action) => {

            const tempCart = state.carts.filter((item) => {
                return item.id !== action.payload;
            })

            state.carts = tempCart;
            storeInLocalStorage(state.carts);

        },
        clearCart: (state, action) => {

            state.carts = [];
            storeInLocalStorage(state.carts);

        },
        getCartTotal: (state, action) => {
            state.totalAmount = state.carts.reduce((accum, cartItem) => {

                accum += cartItem.totalPrice;

                return accum;

            }, 0)
            state.itemsCount = state.carts.length;

        },
        setCartMessageOn: (state) => {
            state.isCartMessageOn = true;
        },

        setCartMessageOff: (state) => {
            state.isCartMessageOn = false;
        }
    }

})

export const { addToCart, toggleCartQty, removeSingleCart, clearCart, getCartTotal, setCartMessageOn, setCartMessageOff } = cartSlice.actions;
export const getAllCarts = (state) => state.cart.carts;
export const getItemsCount = (state) => state.cart.itemsCount;
export const getTotalAmount = (state) => state.cart.totalAmount;
export const getCartMessageStatus = (state) => state.cart.isCartMessageOn;
export default cartSlice.reducer;