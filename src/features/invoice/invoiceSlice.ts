import IInvoice, { IInvoiceMap } from '@/entities/interfaces/invoice/IInvoice'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface InvoiceState {
  invoices?: IInvoiceMap
}

// Define the initial state using that type
const initialState: InvoiceState = {
  invoices: undefined
}

export const invoiceSlice = createSlice({
  name: 'invoice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    saveToInvoice: (state, action: PayloadAction<IInvoice>) => {
      const { invoiceNo } = action.payload;
      const key = `${invoiceNo}`;
      state.invoices = {
              ...state.invoices,
              [key] : {
                ...action.payload
              }
            }
    },
  },
})

export const { saveToInvoice } = invoiceSlice.actions
const invoiceReducer = invoiceSlice.reducer
export default invoiceReducer
