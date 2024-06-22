import {Button, Pressable, Text, View} from "react-native";
import {styled, useColorScheme} from "nativewind";
import {useEffect} from "react";

export function SettingsPage({colorScheme, setColorScheme, setLikes}) {
    return (
        <View className="bg-white dark:bg-cblack h-screen flex flex-col items-center">

            <Pressable onPress={()=>{
                setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
            }}>
                <View className="dark:bg-black w-1/2 p-2 rounded border border-black dark:border-white">
                    <Text className="dark:text-white text-center text-xl">Toggle Dark Mode</Text>
                </View>
            </Pressable>

            <Pressable onPress={()=>{
                setLikes([])
            }}>
                <View className="dark:bg-black w-1/2 p-2 rounded border border-black dark:border-white">
                    <Text className="dark:text-white text-center text-xl">Reset Likes</Text>
                </View>
            </Pressable>

        </View>

    );
}