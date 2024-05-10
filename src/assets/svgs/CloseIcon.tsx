import React from 'react';
import { Path, Svg, SvgProps } from 'react-native-svg';

const CloseIcon = ({ fill, width = 24, height = 24 }: SvgProps) => {
  return (
    <Svg height={height} viewBox='0 -960 960 960' width={width} fill={fill}>
      <Path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
    </Svg>
  );
};

export default CloseIcon;
