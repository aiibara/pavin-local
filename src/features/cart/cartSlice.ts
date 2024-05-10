import ICart, { IProductCart } from '@/entities/interfaces/cart/ICart'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface CartState {
  cart?: ICart
}

// Define the initial state using that type
const initialState: CartState = {
  cart: undefined
}


export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    saveToCart: (state, action: PayloadAction<IProductCart>) => {
      const { productCode, productUnit, productName, productBrand, quantity } = action.payload;
      const key = `${productCode}_${productUnit}`
      const prodName = [productCode, productBrand, productName].join(' ')
      if(state.cart?.[key]) {
        state.cart = {
              ...state.cart,
              [key] : {
                ...state.cart[key],
                quantity: state.cart[key].quantity + quantity,
              }
            }
      } else {
        state.cart = {
              ...state.cart,
              [key] : {
                ...action.payload,
                productName: prodName,
                quantity: 1
              }
            }
      }
     
    },

    editCartItem: (state, action: PayloadAction<Partial<IProductCart>>) => {
      const product = action.payload;
      const key = `${product.productCode}_${product.productUnit}`
      if(state.cart?.[key]) {
        state.cart = {
              ...state.cart,
              [key] : {
                ...state.cart[key],
                ...product
              }
            }
      }
    },
    editCartItemQty: (state, action: PayloadAction<Partial<IProductCart>>) => {
      const product = action.payload;
      const key = `${product.productCode}_${product.productUnit}`
      if(state.cart?.[key]) {
        state.cart = {
              ...state.cart,
              [key] : {
                ...state.cart[key],
                quantity: state.cart[key].quantity + (product.quantity || 0)
              }
            }
      }
    },
    removeCardItem: (state, action: PayloadAction<Partial<IProductCart>>) => {
      const product = action.payload;
      const key = `${product.productCode}_${product.productUnit}`
      if(state.cart?.[key]) {
        const { [key]: toRemove, ...rest} = state.cart;
        state.cart = {
              ...rest
            }
      }
    },
  },
})

export const { saveToCart, editCartItem, editCartItemQty, removeCardItem } = cartSlice.actions
const cartReducer = cartSlice.reducer
export default cartReducer
