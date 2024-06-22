import {styled} from "nativewind";
import {Image, View, Text, SafeAreaView, ScrollView, Button, Touchable, Pressable} from "react-native";
import {useEffect, useState} from "react";
import {LocationListButton} from "../components/LocationListButton";

export function HomePage({ navigation, Locations, likes, setLikes}) {
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
                <Text className="text-gold font-bold text-3xl text-center font-cinzel uppercase">Airsoft DB</Text>
            </View>

            <View>
                <View className="bg-white dark:bg-cblack flex flex-col items-center">
                    {/*Map naar knop Elements*/}
                    {Locations.data.map(loco => (
                        <LocationListButton key={loco.name} loco={loco} navigation={navigation} setLikes={setLikes} likes={likes}></LocationListButton>
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}