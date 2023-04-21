import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const NumberCell = ({value, isActive, setSelectedNum}) => {
  return (
    <TouchableOpacity onPress={() => setSelectedNum(value)}>
      <View
        style={[
          {
            ...styles.numberBox,
            backgroundColor: isActive ? '#2dbdf9' : '#1c242f',
          },
        ]}>
        <Text style={styles.text}>
          {value === 'Back' ? (
            <AntDesign name="back" size={30} color="#fff" />
          ) : value === 'Edit' ? (
            <AntDesign name="edit" size={30} color="#fff" />
          ) : value === 'Erase' ? (
            <FontAwesome5 name="eraser" size={30} color="#fff" />
          ) : (
            value
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NumberCell;

const styles = StyleSheet.create({
  numberBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 2,
    marginVertical: 2,
    width: 55,
    height: 55,
  },
  text: {
    fontSize: 30,
    color: 'white',
  },
});
