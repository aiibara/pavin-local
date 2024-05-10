import { IColors } from '@/entities/interfaces/colors/IColors'
import { UnistylesRegistry } from 'react-native-unistyles'
import colors from './colors'

type AppThemes = {
  light: IColors,
  dark: IColors
}

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry
  .addThemes({
    light: colors.light,
    dark: colors.dark,
  })
  .addConfig({
    adaptiveThemes: true
  })
