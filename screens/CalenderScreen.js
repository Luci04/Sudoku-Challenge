import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimateNumber from 'react-native-animate-number'
import Fontisto from 'react-native-vector-icons/Fontisto';

const CalenderScreen = () => {

    const [dates, setDates] = useState([]);
    const [count, setCount] = useState(1);

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        const getDates = async () => {
            const datesString = await AsyncStorage.getItem('sudoku-challenge-dates');

            const period = await AsyncStorage.getItem('sudoku-challenge-period');

            const consistency = period ? JSON.parse(period) : 0;

            setCount(consistency);

            const dates = datesString ? JSON.parse(datesString) : [];

            setDates(dates);
        };

        getDates();
    }, [count]);

    return (
        <View style={styles.calenderWrapper} >
            <View style={styles.consistency}>
                <Fontisto name="fire" size={50} color="orange" />
                <Text style={{ fontSize: 50, color: '#00adf5' }}>
                    <AnimateNumber
                        timing={(interval, progress) => {
                            // slow start, slow end
                            return interval * (1 - Math.sin(Math.PI * progress)) * 10
                        }}
                        steps={40} value={count} interval={15} countBy={1} />
                </Text>
            </View>
            <Calendar
                theme={styles.calender}
                markedDates={{
                    ...dates.reduce((acc, date) => {
                        return {
                            ...acc,
                            [date]: {
                                selected: true,
                                selectedColor: '#00adf5'
                            },
                        };
                    }, {
                        [formatDate(new Date)]: {
                            marked: true,
                        }
                    })
                }}
            />
        </View>
    )
}

export default CalenderScreen

const styles = StyleSheet.create({
    calenderWrapper: {
        display: 'flex',
        flex: 1,
        padding: 10,
        paddingTop: 20,
        gap: 25
    },
    consistency: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: 150,
        display: 'flex',
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    calender: {
        flex: 1,
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#d9e',
        dayTextColor: '#2d4150',
        textDisabledColor: '#b6c1cd'
    }
})