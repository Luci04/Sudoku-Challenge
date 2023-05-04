import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import SudokuBox from '../components/SudokuBox'
import NumberPad from '../components/NumberPad'
import TimeClock from '../components/Timer'

const GameScreen = () => {
    return (
        <SafeAreaView style={styles.backgroundStyle}>
            <SudokuBox />
        </SafeAreaView>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    backgroundStyle: {
        flex: 1,
        gap: 10,
        display: 'flex',
        justifyContent: 'space-evenly'
    }
});
