export type fontFamilyType ='NunitoSandsLight' | 'NunitoSandsRegular' | 'NunitoSandsSemiBold' | 'NunitoSandsBold' | 'NunitoSandsExtraBold'

type fontsType = {
   [key in fontFamilyType]: string
}

const fonts: fontsType = {
   NunitoSandsLight: 'NunitoSans-Light',
   NunitoSandsRegular: 'NunitoSans-Regular',
   NunitoSandsSemiBold: 'NunitoSans-SemiBold',
   NunitoSandsBold: 'NunitoSans-Bold',
   NunitoSandsExtraBold: 'NunitoSans-ExtraBold',
}

export default fonts