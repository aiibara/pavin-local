import React from 'react';
import { Path, Svg, SvgProps } from 'react-native-svg';

const PrintIcon = ({ fill, width = 24, height = 24 }: SvgProps) => {
  return (
    <Svg height={height} viewBox='0 -960 960 960' width={width} fill={fill}>
      <Path d='M640-640v-120H320v120h-80v-200h480v200h-80Zm-480 80h640-640Zm560 100q17 0 28.5-11.5T760-500q0-17-11.5-28.5T720-540q-17 0-28.5 11.5T680-500q0 17 11.5 28.5T720-460Zm-80 260v-160H320v160h320Zm80 80H240v-160H80v-240q0-51 35-85.5t85-34.5h560q51 0 85.5 34.5T880-520v240H720v160Zm80-240v-160q0-17-11.5-28.5T760-560H200q-17 0-28.5 11.5T160-520v160h80v-80h480v80h80Z' />
    </Svg>
  );
};

export default PrintIcon;
