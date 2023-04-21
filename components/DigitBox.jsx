import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

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
      backgroundColor: isActive ? '#273e4c' : '#1c242f',
      backgroundColor:
        isError && solid
          ? 'rgba(255, 100, 0,0.7)'
          : isError
          ? 'rgba(255, 0, 0,0.7)'
          : '#1c242f',
    },
    text: {
      textAlign: 'center',
      fontSize: 20,
      color: 'white',
    },
  });

  return (
    <TouchableOpacity
      onPress={() => {
        // console.log('Error State:', isError);
        handleCellPress(rowIndex, colIndex);
      }}>
      <View style={styles.cell}>
        <Text
          style={styles.text}
          // onPress={() => handleCellPress(rowIndex, colIndex)}
        >
          {value === 0 ? '' : value}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DigitBox;
