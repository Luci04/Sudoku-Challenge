import { ActivityIndicator, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';



const HomeScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)

    const fetchGame = () => {
        setLoading(true)
        fetch('https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}')
            .then((data) => data.json())
            .then((data) => {
                const date = new Date();
                AsyncStorage.setItem('GAME_START_TIME', JSON.stringify(date))
                    .then(() => {
                        dispatch({ type: 'SET_BOARD', payload: data.newboard.grids[0].value });
                        dispatch({ type: 'SET_SOLID', payload: data.newboard.grids[0].value })
                        setLoading(false);
                        navigation.navigate('GameScreen');
                    })
                    .catche(e => {
                        throw e;
                    })
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            })
    }


    return (
        <View style={styles.homewrapper}>
            <View style={styles.btnWrapper}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('GameScreen');
                }} >
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>
                        Daily Challenge
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.btnWrapper}>
                <TouchableOpacity onPress={fetchGame} >
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>
                        {loading && <ActivityIndicator size={20} />}
                        {!loading && "Start Game"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    homewrapper: {
        flex: 1,
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnWrapper: {
        backgroundColor: "#00adf5",
        paddingVertical: 30,
        width: "90%",
        textAlign: 'center',
        borderRadius: 5
    }
})