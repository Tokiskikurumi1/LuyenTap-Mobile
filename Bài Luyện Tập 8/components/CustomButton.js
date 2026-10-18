import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

/**
 * COMPONENT CUSTOMBUTTON
 * Minh họa lợi ích của việc tách component nhỏ: Tái sử dụng nút bấm nhất quán trên toàn ứng dụng.
 */
const CustomButton = ({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger'
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.buttonBase, styles[variant], style]}
      onPress={onPress}
    >
      <Text style={[styles.textBase, styles[`${variant}Text`], textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textBase: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  primary: {
    backgroundColor: '#0284c7', // Sky 600
  },
  primaryText: {
    color: '#ffffff',
  },
  secondary: {
    backgroundColor: '#334155', // Slate 700
  },
  secondaryText: {
    color: '#f8fafc',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#38bdf8',
  },
  outlineText: {
    color: '#38bdf8',
  },
  danger: {
    backgroundColor: '#ef4444',
  },
  dangerText: {
    color: '#ffffff',
  },
});

export default CustomButton;
