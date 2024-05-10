import React from 'react';
import { Path, Svg, SvgProps } from 'react-native-svg';

const PlusCircleIcon = ({
  fill = '#000',
  width = 24,
  height = 24,
}: SvgProps) => {
  return (
    <Svg width={width} height={height} viewBox='0 0 16 16' fill='currentColor'>
      <Path
        fill-rule='evenodd'
        d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z'
        fill={fill}
      />
    </Svg>
  );
};

export default PlusCircleIcon;
