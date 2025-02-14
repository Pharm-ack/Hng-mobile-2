import { Text, TextProps } from 'react-native';
import { fonts } from '../constants/fonts';
import React from 'react';

export default function CustomText(props: TextProps) {
  return (
    <Text {...props} style={[{ fontFamily: fonts.regular }, props.style]}>
      {props.children}
    </Text>
  );
}
