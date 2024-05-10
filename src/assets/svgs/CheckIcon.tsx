import React from 'react';
import { Path, Svg, SvgProps } from 'react-native-svg';

const CheckIcon = ({ fill, width = 24, height = 24 }: SvgProps) => {
  return (
    <Svg height={height} viewBox='0 -960 960 960' width={width}>
      <Path
        d='M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z'
        fill={fill}
      />
    </Svg>
  );
};

export default CheckIcon;
