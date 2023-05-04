import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import GameScreen from '../screens/GameScreen';
import HomeScreen from '../screens/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { solveSudoku } from './importantFunctions';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const StackNavigator = () => {

    const dispatch = useDispatch();

    const [isPaused, setIsPaused] = useState(false);

    const [isSolved, setisSolved] = useState(false);

    const clickSolve = (matrix) => {

        // dispatch({ type: 'SET_BOARD', payload: matrix })
    }

    const { solidBoard } = useSelector(state => state.solidReducer);

    const { startTime } = useSelector((state) => {
        return state.timerReducer
    });


    useEffect(() => {
        // console.log(solidBoard)
    }, [dispatch, solidBoard])


    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                options={{
                    headerShown: false,
                    headerRight: () => (
                        <Pressable
                            onPress={() => alert('This is a button!')}
                            title="Info"
                            color="#fff"
                        >
                            <Ionicons name={"pause-outline"} size={20} />
                        </Pressable>
                    ),
                }}
                component={HomeScreen} />
            <Stack.Screen
                options={{
                    headerTitle: "",
                    headerRight: () => (
                        <View style={styles.btnContainer} >
                            <Pressable
                                onPress={() => {
                                    setIsPaused(!isPaused);
                                    dispatch({ type: 'SET_START_TIME', payload: !startTime });
                                }}
                                title="Info"
                                color="#fff"
                            >
                                <View style={styles.iconWrapper}>
                                    <Ionicons name={isPaused ? 'play' : `pause-outline`} color={isPaused ? "#00adf5" : "#6f8394"} size={25} />
                                </View>
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    setisSolved(!isSolved);
                                    dispatch({ type: 'SET_START_TIME', payload: false });
                                    dispatch({
                                        type: 'SET_REMAIN', payload: {
                                            1: 0,
                                            2: 0,
                                            3: 0,
                                            4: 0,
                                            5: 0,
                                            6: 0,
                                            7: 0,
                                            8: 0,
                                            9: 0,
                                        },
                                    })

                                    dispatch({
                                        type: 'SET_ERROR_ROW', payload: {
                                            1: 0,
                                            2: 0,
                                            3: 0,
                                            4: 0,
                                            5: 0,
                                            6: 0,
                                            7: 0,
                                            8: 0,
                                            9: 0,
                                        },
                                    })

                                    dispatch({
                                        type: 'SET_ERROR_COL', payload: {
                                            1: 0,
                                            2: 0,
                                            3: 0,
                                            4: 0,
                                            5: 0,
                                            6: 0,
                                            7: 0,
                                            8: 0,
                                            9: 0,
                                        },
                                    })
                                    solveSudoku(solidBoard, clickSolve);
                                    dispatch({ type: 'SET_HAS_WON', payload: true })
                                }}
                                title="Info"
                                color="#fff"
                            >
                                <View style={styles.iconWrapper}>
                                    <Ionicons name={isSolved ? "bulb" : "bulb-outline"} color={isSolved ? "#00adf5" : "#6f8394"} size={25} />
                                </View>
                            </Pressable>
                        </View>
                    ),
                }}
                name="GameScreen" component={GameScreen} />
        </Stack.Navigator>
    )
}

export default StackNavigator

const styles = StyleSheet.create({
    btnContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        width: 120
        // paddingHorizontal: 20
    },
    iconWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        width: 60,
    }
})