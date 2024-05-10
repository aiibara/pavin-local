import IProduct from '@/entities/interfaces/product/IProduct'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { productData } from './sample'

// Define a type for the slice state
interface ProductState {
  products: IProduct[]
}

// Define the initial state using that type
const initialState: ProductState = {
  products: productData
}

export const productSlice = createSlice({
  name: 'products',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    saveProduct: (state, action: PayloadAction<IProduct>) => {
      state.products = [...state.products, action.payload]
    },
  },
})

export const { saveProduct } = productSlice.actions
const productReducer = productSlice.reducer
export default productReducer