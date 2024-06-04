import {Image, StyleSheet, Platform} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {Text, View} from 'react-native';
import {styled} from "nativewind";
import {PropsWithChildren, useEffect, useState} from "react";
import {element} from "prop-types";

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledImage = styled(Image)
const StyledParallaxScrollView = styled(ParallaxScrollView)

export function LocationList({loaded, error, data}: PropsWithChildren<{
    error: boolean,
    loaded: boolean,
    data: Array<{ name: string, description: string, address: string, LatLng: { latitude: number, longitude: number } }>
}>) {
    if (!loaded) {
        return (<StyledText>
            Data not Loaded
        </StyledText>)
    } else if (error) {
        // @ts-ignore
        return (<StyledText>Data Error {data}</StyledText>)
    } else {
        return (<StyledView className="bg-gray-300 dark:bg-cblack flex flex-col">
            {data.map(loco => (<StyledView
                className="p-2 flex flex-col w-full"
            key={loco.name}>
                <StyledText className="text-2xl font-bold font-cinzel uppercase text-black dark:text-white">
                    {loco.name}
                </StyledText>
                <StyledText className="text-lg font-bold font-inter text-gray-800 dark:text-gray-400">
                    {loco.description}
                </StyledText>
                <StyledText className="text-lg font-bold font-inter text-gray-800 dark:text-gray-400 underline">
                    {loco.address}
                </StyledText>
            </StyledView>))}
        </StyledView>)

    }
}

export default function HomeScreen() {

    const [Locations, SetLocations] = useState({set: false, error: false, data: []});
    useEffect(() => {
        (async () => {
            await fetch("https://stud.hosted.hr.nl/1062604/AirsoftLocations.json")
                .then(res => res.json())
                .then(json => {
                    SetLocations({set: true, error: false, data: json.data})
                })
                .catch(e => {
                    SetLocations({set: false, error: true, data: e})
                })
        })();
    }, [])
    return (
        <StyledParallaxScrollView
            headerBackgroundColor={{light: '#A1CEDC', dark: '#1D1D1D'}}
            headerImage={
                <StyledImage
                    source={require('@/assets/images/airsoft.jpg')}
                    className="object-contain w-screen h-full"
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <StyledText className="text-gold font-bold text-3xl font-cinzel">Airsoft Locaties in Nederland!</StyledText>
            </ThemedView>

            <StyledView>
                <LocationList loaded={Locations.set} data={Locations.data} error={Locations.error}/>
            </StyledView>

        </StyledParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
