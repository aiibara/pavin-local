export type fontFamilyType ='NunitoSandsLight' | 'NunitoSandsRegular' | 'NunitoSandsSemiBold' | 'NunitoSandsBold' | 'NunitoSandsExtraBold' | 'RobotoLight' | 'RobotoRegular' | 'RobotoMedium' | 'RobotoBold'

type fontsType = {
   [key in fontFamilyType]: string
}

const fonts: fontsType = {
   NunitoSandsLight: 'NunitoSans-Light',
   NunitoSandsRegular: 'NunitoSans-Regular',
   NunitoSandsSemiBold: 'NunitoSans-SemiBold',
   NunitoSandsBold: 'NunitoSans-Bold',
   NunitoSandsExtraBold: 'NunitoSans-ExtraBold',
   RobotoLight: 'Roboto-Light',
   RobotoRegular: 'Roboto-Regular',
   RobotoMedium: 'Roboto-Medium',
   RobotoBold: 'Roboto-Bold'
}

export default fonts