import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import NumberCell from './NumberCell';
import {useDispatch, useSelector} from 'react-redux';

const NumberPad = () => {
  const dispatch = useDispatch();

  const {selectedNum} = useSelector(state => state.sudokuReducer);

  const handleButtonClick = useCallback(
    num => {
      dispatch({type: 'SET_NUM', payload: num});
    },
    [selectedNum],
  );

  // useEffect(() => {}, [dispatch]);

  return (
    <View style={styles.digitBoxContainer}>
      <NumberCell setSelectedNum={handleButtonClick} value={1} />
      <NumberCell setSelectedNum={handleButtonClick} value={2} />
      <NumberCell setSelectedNum={handleButtonClick} value={3} />
      <NumberCell setSelectedNum={handleButtonClick} value={4} />
      <NumberCell setSelectedNum={handleButtonClick} value={5} />
      <NumberCell setSelectedNum={handleButtonClick} value={6} />
      <NumberCell setSelectedNum={handleButtonClick} value={7} />
      <NumberCell setSelectedNum={handleButtonClick} value={8} />
      <NumberCell setSelectedNum={handleButtonClick} value={9} />
      <NumberCell setSelectedNum={handleButtonClick} value={'Erase'} />
      <NumberCell setSelectedNum={handleButtonClick} value={'Edit'} />
      <NumberCell setSelectedNum={handleButtonClick} value={'Back'} />
    </View>
  );
};

export default NumberPad;

const styles = StyleSheet.create({
  digitBoxContainer: {
    flex: 1,
    marginHorizontal: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
