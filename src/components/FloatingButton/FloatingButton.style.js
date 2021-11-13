import {StyleSheet} from 'react-native';

import colors from '../../styles/color';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purple,
  },
});
