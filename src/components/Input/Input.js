import React from 'react';
import {TextInput, View} from 'react-native';

import styles from './Input.style';

const Input = ({placeholder, value, onType, isSecure}) => {
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        placeholderTextColor="#808e95"
        placeholder={placeholder}
        onChangeText={onType}
        value={value}
        secureTextEntry={isSecure}
        color="black"
      />
    </View>
  );
};

export default Input;
