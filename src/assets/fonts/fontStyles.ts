import fonts from "./fonts";


export enum fontType {
 largeTitle ='largeTitle',
  title1 ='title1',
  title2 ='title2',
  title3 ='title3',
  headline ='headline',
  body ='body',
  callout ='callout',
  subhead = 'subhead'
}
 

type fontStylesType = {
  [key in fontType]: {
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
  };
};

//https://www.figma.com/file/sZvgqOUiTtfQXTIla7Ooum/Pavin?type=design&node-id=21-964&mode=design&t=uMqkJyCprO0OpF4k-4
const fontStyles: fontStylesType = {
  largeTitle: {
    fontFamily: fonts.NunitoSandsRegular,
    fontSize: 33,
    lineHeight: 40,
  },
  title1: {
    fontFamily: fonts.NunitoSandsRegular,
    fontSize: 27,
    lineHeight: 33,
  },
  title2: {
    fontFamily: fonts.NunitoSandsRegular,
    fontSize: 21,
    lineHeight: 26,
  },
  title3: {
    fontFamily: fonts.NunitoSandsBold,
    fontSize: 19,
    lineHeight: 24,
  },
  headline: {
    fontFamily: fonts.NunitoSandsBold,
    fontSize: 16,
    lineHeight: 21,
  },
  body: {
    fontFamily: fonts.NunitoSandsRegular,
    fontSize: 16,
    lineHeight: 21,
  },
  callout: {
    fontFamily: fonts.NunitoSandsSemiBold,
    fontSize: 15,
    lineHeight: 20,
  },
  subhead: {
    fontFamily: fonts.NunitoSandsRegular,
    fontSize: 14,
    lineHeight: 19,
  },
};

export default fontStyles;