import { ITheme } from "@/entities/interfaces/colors/IColors";

const colors: ITheme = {
   light: {
      text_primary: '#1E5128',
      text_secondary: '#fff',
      text_danger: '#D54C4C',
      text_success: '#4E9F3D',
      bg_header: '#4E9F3D',
      bg_content: '#fff',
      bg_card: '#fff',
      bg_tab: '#D8E9A8',
      border_input: '#D8E9A8',
      border_card: '#D8E9A8',
      
   },
   dark: {
      text_primary: '#fff',
      text_secondary: '#fff',
      text_danger: '#D54C4C',
      text_success: '#4E9F3D',
      bg_header: '#4E9F3D',
      bg_content: '#000',
      bg_card: '#323d32',
      bg_tab: '#1E5128',
      border_input: '#fff',
      border_card: '#fff',
   }
}

export default colors;