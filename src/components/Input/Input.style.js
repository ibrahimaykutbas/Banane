import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: '#4B3869',
  },
  input: {
    paddingLeft: Platform.OS === 'android' ? 5 : 5,
  },
});
