export interface IColors {
   text_primary: string,
   text_secondary: string,
   text_danger: string,
   text_success: string,
   bg_header: string,
   bg_content: string,
   bg_tab: string,
   bg_card: string,
   border_input: string,
   border_card: string

}

export interface ITheme {
   dark: IColors,
   light: IColors
}