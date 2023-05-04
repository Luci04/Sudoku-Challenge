import {StyleSheet, Text, Modal, View, Button, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ShareExample from './ShareBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompletedModal = ({won, setHaveWon, handleNotification}) => {
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const [timeTaken, setTimeTaken] = useState({});

  const handleStoringDate = async () => {
    const prevDate = await AsyncStorage.getItem('sudoku-challenge-dates');

    const period = await AsyncStorage.getItem('sudoku-challenge-period');

    const dates = prevDate ? JSON.parse(prevDate) : [];

    const consistency = period ? JSON.parse(period) + 1 : 0;

    await AsyncStorage.setItem(
      'sudoku-challenge-period',
      JSON.stringify(consistency),
    );

    const today = new Date();

    const formattedDate = formatDate(today);

    if (dates.length > 0 && dates[dates.length - 1] === formattedDate) return;

    dates.push(formattedDate);

    await AsyncStorage.setItem('sudoku-challenge-dates', JSON.stringify(dates));
  };

  function getDateTimeDifference(date1Str) {
    const date1 = new Date(date1Str);
    const date2 = new Date();

    const diffTime = Math.abs(date2 - date1);
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

    return [diffHours, diffMinutes, diffSeconds];
  }

  useEffect(() => {
    AsyncStorage.getItem('GAME_START_TIME')
      .then(data => JSON.parse(data))
      .then(data => {
        const time = getDateTimeDifference(data);
        return time;
      })
      .then(data => setTimeTaken(data))
      .catch(e => {
        console.log('Error', e);
      });
    return () => {};
  }, []);

  return (
    <View>
      <Modal
        animationType={'fade'}
        visible={won}
        transparent={true}
        onRequestClose={() => {
          // console.log('Modal has been closed.');
        }}>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <Text style={styles.heading}>Completed</Text>
            <Text style={styles.subtext}>
              You successfully solved this Sudoku puzzle!
            </Text>
            <View style={styles.Details}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    display: 'flex',
                    gap: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Fontisto name="fire" size={30} color="#e37ca7" />
                  <Text>Difficulty</Text>
                </View>
                <Text>Novice</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    display: 'flex',
                    gap: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <AntDesign name="clockcircleo" size={30} color="#a85ce8" />
                  {/* <Text>{timeTaken}</Text> */}
                </View>
                {timeTaken && (
                  <Text>
                    {timeTaken[0]} : {timeTaken[1]} : {timeTaken[2]}
                  </Text>
                )}
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    display: 'flex',
                    gap: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <AntDesign name="staro" size={30} color="#ffce59" />
                  <Text>Best Time</Text>
                </View>
                <Text>00:42:30</Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Pressable
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 50,
                  backgroundColor: '#509abd',
                  height: 50,
                  borderRadius: 25,
                  fontSize: 20,
                }}
                onPress={async () => {
                  handleNotification({name: 'AVinash', message: 'Have Won !'});
                  setHaveWon(false);
                  await handleStoringDate();
                }}>
                <Text>Done</Text>
              </Pressable>
              <ShareExample />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CompletedModal;

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    zIndex: 100,
    backgroundColor: '#1c242f',
    height: 400,
    width: '80%',
    borderRadius: 10,
    marginTop: 150,
    marginLeft: 40,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    margin: 30,
  },
  heading: {
    textTransform: 'uppercase',
    fontSize: 18,
    textAlign: 'center',
    color: '#7a8594',
  },
  subtext: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
  },

  Details: {
    gap: 20,
    paddingBottom: 20,
  },
});
