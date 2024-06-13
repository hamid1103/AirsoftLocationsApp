import {StyleSheet, Image, Platform, View, Text, SafeAreaView} from 'react-native';
import {styled} from "nativewind";
import MapView, {Marker} from "react-native-maps";
import {useEffect, useState} from "react";

export default function Map({route, navigation, Locations}) {
    console.log(route)
    let LocLatLng = null
    if(typeof route.params != "undefined")
    {
        LocLatLng = route.params.LocLatLng
    }

    const initialRegion = (LocLatLng === null ? {
            latitude: 51.88173503246226,
            longitude: 5.301747550883823,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        } :
        {
            latitude: LocLatLng.latitude,
            longitude: LocLatLng.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
    const Div = styled(View)
    const StyledText = styled(Text)
    const StyledMapView = styled(MapView)

    return (
        <SafeAreaView>
            <Div className="h-[5%] w-full bg-white dark:bg-cblack">

            </Div>
            <Div className="h-[95%] w-full bg-white dark:bg-cblack">
                <StyledMapView
                    className="w-full h-full"
                    initialRegion={initialRegion}
                >
                    {Locations.data.map((loco, index) => (
                        <Marker
                            key={index}
                            // @ts-ignore
                            coordinate={loco.LatLng}
                            // @ts-ignore
                            title={loco.name}
                            // @ts-ignore
                            description={loco.description}
                        />
                    ))}
                </StyledMapView>
            </Div>

        </SafeAreaView>
    );


}
