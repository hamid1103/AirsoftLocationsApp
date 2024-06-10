import {styled} from "nativewind";
import {Image, View, Text, SafeAreaView, ScrollView, Button, Touchable, Pressable} from "react-native";
import {useEffect, useState} from "react";

export function HomePage({ navigation, Locations}) {
    if (!Locations.set) {
        return (<Text>
            Data not Loaded
        </Text>)
    } else if (Locations.error) {
        // @ts-ignore
        return (<Text>Data Error {Locations.data}</Text>)
    }
    return (
        <ScrollView className="h-full bg-white dark:bg-cblack">
            <View className="h-64 mb-8">
                <Image className="object-contain w-screen h-full" source={require('../assets/images/airsoft.jpg')}/>
            </View>

            <View className="flex items-center mb-8">
                <Text className="text-gold font-bold text-3xl text-center font-cinzel">Airsoft Locaties in
                    Nederland!</Text>
            </View>

            <View>
                <View className="bg-gray-300 dark:bg-cblack flex flex-col items-center">
                    {Locations.data.map(loco => (
                        <Pressable
                            key={loco.name}
                            onPress={()=>{
                                navigation.navigate('Map', {
                                    LocLatLng: loco.LatLng
                                })
                            }}>
                            <View
                                className="p-2 flex flex-col w-11/12 mb-3 rounded-2xl bg-white dark:bg-black pb-3 pt-3 pl-1 pr-1 items-center"
                            >
                                <Text className="text-2xl font-bold font-cinzel uppercase text-black dark:text-white text-center">
                                    {loco.name}
                                </Text>
                                <Text className="text-lg font-bold font-inter text-gray-800 dark:text-gray-400">
                                    {loco.description}
                                </Text>
                                <Text className="text-lg font-bold font-inter text-gray-800 dark:text-gray-400 underline">
                                    {loco.address}
                                </Text>
                            </View>
                        </Pressable>
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}