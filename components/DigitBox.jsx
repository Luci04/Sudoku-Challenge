import React from 'react';

import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const bg1 = require('../assets/backgound1.jpg');
const bg2 = require('../assets/backgound2.jpg');
const bg3 = require('../assets/backgound3.jpg');
const bg4 = require('../assets/backgound4.jpg');

const DigitBox = ({
  value,
  rowIndex,
  colIndex,
  isActive,
  isError,
  handleCellPress,
  solid,
}) => {
  const styles = StyleSheet.create({
    cell: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      width: 40,
      height: 40,
      textAlign: 'center',
      fontSize: 20,
      borderTopColor: '#204153',
      borderLeftColor: '#204153',
      borderRightColor:
        colIndex % 3 == 2 && colIndex != 8 ? '#5b99b3' : '#204153',
      borderBottomColor:
        rowIndex % 3 == 2 && rowIndex != 8 ? '#5b99b3' : '#204153',
    },
    text: {
      textAlign: 'center',
      fontSize: 20,
      color: 'white',
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        // console.log('Error State:', isError);
        handleCellPress(rowIndex, colIndex);
      }}>
      <ImageBackground
        source={
          solid && isError
            ? bg2
            : isError
            ? bg1
            : isActive && value !== null
            ? bg4
            : bg3
        }
        resizeMode="cover">
        <View style={styles.cell}>
          <Text style={styles.text}>{value === 0 ? '' : value}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default DigitBox;
