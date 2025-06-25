import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductData } from "../layout/dashboard/ProductInterface";


export interface CartItem extends ProductData {
    quantity: number;
}

interface cartState {
    items: CartItem[],

}

const initialState: cartState = {
    items: [],

}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ProductData>) => {
            const existing = state.items.find(item => item.id === action.payload.id)
            if (existing) {
                existing.quantity += 1
            }
            else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        increaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) item.quantity += 1;
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) item.quantity -= 1;
        },
        clearcart: (state) => {
            state.items = []
        }
    }
})

export const { addToCart, removeFromCart, clearcart,increaseQuantity, decreaseQuantity } = cartSlice.actions
export default cartSlice.reducer;