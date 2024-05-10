import React from 'react';
import { Path, Svg, SvgProps } from 'react-native-svg';

const MinusCircleIcon = ({
  fill = '#000',
  width = 24,
  height = 24,
}: SvgProps) => {
  return (
    <Svg height={height} viewBox='0 0 56 56' width={width}>
      <Path
        d='m27.9999 51.9063c13.0547 0 23.9064-10.8282 23.9064-23.9063 0-13.0547-10.8751-23.9063-23.9298-23.9063-13.0782 0-23.8828 10.8516-23.8828 23.9063 0 13.0781 10.8281 23.9063 23.9062 23.9063zm-9.9141-21.8204c-1.3828 0-2.3437-.7265-2.3437-2.039 0-1.336.9141-2.086 2.3437-2.086h19.8047c1.4297 0 2.3204.75 2.3204 2.086 0 1.3125-.9376 2.039-2.3204 2.039z'
        fill={fill}
      />
    </Svg>
  );
};

export default MinusCircleIcon;
