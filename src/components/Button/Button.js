import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';

import styles from './Button.style';

const Button = ({text, onPress, theme = 'primary', loading}) => {
  return (
    <TouchableOpacity style={styles[theme].container} onPress={onPress}>
      <Text style={styles[theme].text}>
        {loading ? <ActivityIndicator size="small" color="white" /> : text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
