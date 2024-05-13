
import ICart, { IProductCart, ProductCart } from '@/entities/interfaces/cart/ICart'
import IInvoice from '@/entities/interfaces/invoice/IInvoice'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface CartState {
  cart?: ICart
  invoice?: Partial<IInvoice>
}

// Define the initial state using that type
const initialState: CartState = {
  cart: undefined,
  invoice: undefined
}


export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    saveToCart: (state, action: PayloadAction<IProductCart>) => {
      const { productCode, productUnit, productName, productBrand, quantity } = action.payload;
      const key = new ProductCart(action.payload).key
      const prodName = [productCode, productBrand, productName].join(' ')

      const lastModify = new Date().getTime()
      if(state.cart?.[key]) {
        state.cart = {
              ...state.cart,
              [key] : {
                ...state.cart[key],
                quantity: state.cart[key].quantity + quantity,
                lastModify
              }
            }
      } else {
        state.cart = {
              ...state.cart,
              [key] : {
                ...action.payload,
                productName: prodName,
                quantity: 1,
                lastModify
              }
            }
      }
     
    },

    editCartItem: (state, action: PayloadAction<Partial<IProductCart>>) => {
      const product = action.payload;
      const key = new ProductCart(product).key

      const lastModify = new Date().getTime()
      if(state.cart?.[key]) {
        state.cart = {
              ...state.cart,
              [key] : {
                ...state.cart[key],
                ...product,
                lastModify
              }
            }
      }
    },
    editCartItemQty: (state, action: PayloadAction<Partial<IProductCart>>) => {
      const product = action.payload;
      const key = new ProductCart(product).key

      const lastModify = new Date().getTime()
      if(state.cart?.[key]) {
        state.cart = {
              ...state.cart,
              [key] : {
                ...state.cart[key],
                quantity: state.cart[key].quantity + (product.quantity || 0),
                lastModify
              }
            }
      }
    },
    removeCardItem: (state, action: PayloadAction<Partial<IProductCart>>) => {
      const product = action.payload;
      const key = new ProductCart(product).key
      if(state.cart?.[key]) {
        const { [key]: toRemove, ...rest} = state.cart;
        state.cart = {
              ...rest
            }
      }
    },

    clearCart: (state) => {
      state.cart = undefined
      state.invoice = undefined
    },

    setCartInvoiceDetail:  (state, action: PayloadAction<Partial<IInvoice>>) => {
      state.invoice = {
              ...action.payload
            }
    },
  },
})

export const { 
  saveToCart, 
  editCartItem, 
  editCartItemQty, 
  removeCardItem, 
  clearCart,
  setCartInvoiceDetail 
} = cartSlice.actions
const cartReducer = cartSlice.reducer
export default cartReducer
