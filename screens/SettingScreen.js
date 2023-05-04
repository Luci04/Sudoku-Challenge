import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PushNotification from 'react-native-push-notification';
import { PermissionsAndroid } from 'react-native';

const SettingScreen = () => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible);
    };

    function convertUTCToLocalTime(utcTimestamp) {
        const options = { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone };
        const date = new Date(utcTimestamp);
        const localTime = date.toLocaleString('en-US', options);
        return localTime;
    }


    const scheduIeNotification = (date) => {

        PushNotification.localNotificationSchedule({
            channelId: "test-Channel",
            title: 'Its Time Now!',
            message: `Let's Play Sudoku`,
            date: date,
            repeatType: 'day'
        });
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        scheduIeNotification(date);
        hideDatePicker();
    };

    return (
        <View>
            <TouchableOpacity activeOpacity={0.6} onPress={showDatePicker} >
                <View style={styles.btn}>
                    {/* <Button style={} title="Set Remainder"/> */}
                    <Text style={styles.btnText}>Set Remainder</Text>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode='time'
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    btn: {
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 15,
        height: 80,
        backgroundColor: "#00adf5",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontSize: 18
    }

})