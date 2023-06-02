import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
const CustomButton = ({
  disabled,
  onPress,
  title,
  titleColor,
  fontSize,
  width,
  height,
  backgroundColor,
  borderRadius,
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  align,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
        ...align,
      }}>
      <Text style={{color: titleColor, fontSize: fontSize}}>{title}</Text>
    </TouchableOpacity>
  );
};
export default CustomButton;
