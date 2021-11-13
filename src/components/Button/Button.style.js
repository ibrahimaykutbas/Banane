import {StyleSheet} from 'react-native';

import colors from '../../styles/color';

const base_style = StyleSheet.create({
  container: {
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default {
  primary: StyleSheet.create({
    container: {
      ...base_style.container,
      backgroundColor: colors.purple,
    },
    text: {
      ...base_style.title,
      color: 'white',
    },
  }),

  secondary: StyleSheet.create({
    container: {
      ...base_style.container,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: colors.purple,
    },
    text: {
      ...base_style.title,
      color: colors.purple,
    },
  }),
};
