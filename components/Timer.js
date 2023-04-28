import { Stopwatch, Timer } from 'react-native-stopwatch-timer'
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

const options = {
    container: {
        backgroundColor: 'transparent'
    },
    text: {
        fontSize: 20,
        color: '#b0c8e2',
    }
};

const TimeClock = () => {
    return (
        <View style={styles.timerContainer}>
            <Ionicons name="time-outline" size={30} color="#d195f5" />
            <Stopwatch options={options} hour={false} start={true} msecs={false} />
        </View>
    )
}

export default TimeClock

const styles = StyleSheet.create({
    timerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    }
})