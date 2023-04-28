import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import NumberCell from './NumberCell';
import {useDispatch, useSelector} from 'react-redux';

const NumberPad = ({remainDigits}) => {
  const dispatch = useDispatch();
  const {selectedNum} = useSelector(state => state.sudokuReducer);

  const handleClick = num => {
    dispatch({type: 'SET_NUM', payload: num});
    console.log('Avinash', selectedNum);
  };

  useEffect(() => {
    console.log('Avinash', selectedNum);
  }, [dispatch, selectedNum]);

  return (
    <View style={styles.digitBoxContainer}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'Edit', 'Erase', 'Back'].map(
        (num, index) => (
          <NumberCell
            setSelectedNum={handleClick}
            key={index}
            isDisable={remainDigits[num] <= 0}
            value={num}
            isActive={selectedNum === num}
          />
        ),
      )}
    </View>
  );
};

export default NumberPad;

const styles = StyleSheet.create({
  digitBoxContainer: {
    flex: 1,
    width: 360,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
