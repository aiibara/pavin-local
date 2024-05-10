import IConfig from '@/entities/interfaces/config/IConfig'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { configData } from './sample'

// Define a type for the slice state
interface ConfigState {
  config: IConfig
}

// Define the initial state using that type
const initialState: ConfigState = {
  config: configData
}

export const configSlice = createSlice({
  name: 'config',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    saveBrand: (state, action: PayloadAction<string>) => {
      state.config.brands = [...state.config.brands, action.payload]
    },
    saveUnit: (state, action: PayloadAction<string>) => {
      state.config.units = [...state.config.units, action.payload]
    },
  },
})

export const { saveBrand, saveUnit } = configSlice.actions
const configReducer = configSlice.reducer
export default configReducer