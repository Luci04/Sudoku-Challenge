import {StyleSheet, Text, Modal, View, Button, Pressable} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ShareExample from './ShareBtn';

const CompletedModal = ({won, setHaveWon}) => {
  return (
    <View>
      <Modal
        animationType={'fade'}
        visible={won}
        transparent={true}
        onRequestClose={() => {
          console.log('Modal has been closed.');
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
                  <Text>Time</Text>
                </View>
                <Text>00:42:30</Text>
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
                onPress={() => {
                  setHaveWon(false);
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
