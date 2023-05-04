import { Stopwatch, Timer } from 'react-native-stopwatch-timer'
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'


const TimeClock = () => {

    const [time, setTime] = useState(0)

    const { startTime } = useSelector((state) => {
        return state.timerReducer
    });


    useEffect(() => {
        let st
        if (startTime) {
            st = setInterval(() => {
                setTime(time + 1);
            }, 1000)

        }
        return () => {
            clearInterval(st);
        }
    }, [startTime, time])

    return (
        <View style={styles.timerContainer}>
            <Ionicons name="time-outline" size={30} color="#d195f5" />
            <Text style={styles.time}>{Math.floor(time / 60)}:{Math.floor(time) % 60}</Text>
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
        gap: 10,
        marginTop: 20,
    },
    time: {
        color: '#8899a2',
        fontSize: 25
    }
})