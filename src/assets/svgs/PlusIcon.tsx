import React from 'react';
import { Path, Svg, SvgProps } from 'react-native-svg';

const PlusIcon = ({ fill, width = 24, height = 24 }: SvgProps) => {
  return (
    <Svg height={height} viewBox='0 -960 960 960' width={width}>
      <Path
        d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z'
        fill={fill}
      />
    </Svg>
  );
};

export default PlusIcon;
