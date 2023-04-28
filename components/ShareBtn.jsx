import React from 'react';
import {Alert, Share, View, Button, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ShareExample = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Hey, I just have solved Novice Sudoku Master puzzle.Can you beat my best times in it? https://play.google.com/store/apps/details?id=com.relitygames.sudokux ',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <Pressable
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#ab85f6',
        width: 50,
        height: 50,
      }}
      onPress={onShare}>
      <AntDesign name="sharealt" size={30} color="#fff" />
    </Pressable>
  );
};

export default ShareExample;
