import {StyleSheet, Image, Platform, View, Text, SafeAreaView, Alert} from 'react-native';
import {styled} from "nativewind";
import MapView, {Marker} from "react-native-maps";
import {useEffect, useState} from "react";
import * as Location from "expo-location"

export default function Map({route, navigation, Locations}) {
    console.log(route)
    let LocLatLng = null

    //Als je hier komt vanaf de navigator inplaats van een knop is de content van route.params undefined.
    if (typeof route.params != "undefined") {
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
    const [locPerms, setLocPerms] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null)

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Location Permission", "We need to use your location to show your position on the map.", [
                    {
                        text: 'Change Settings', onPress: () => {
                            LocLatLng ? navigation.navigate('Map', {
                                LocLatLng: LocLatLng
                            }) : navigation.navigate('Map')
                        }
                    },
                    {
                        text:"Don't show me then",
                        onPress: ()=>{
                            setLocPerms(false)
                        }
                    }
                ])
                return;
            }
            let loco = await Location.getCurrentPositionAsync()
            console.log(loco)
            setCurrentLocation(loco)
            setLocPerms(true)
        })();
    }, [])

    return (
        <SafeAreaView>
            <Div className="h-[5%] w-full bg-white dark:bg-cblack">

            </Div>
            <Div className="h-[95%] w-full bg-white dark:bg-cblack">
                <StyledMapView
                    className="w-full h-full"
                    initialRegion={locPerms ? {longitude: currentLocation.coords.longitude,
                    latitude: currentLocation.coords.latitude,
                    longitudeDelta: 0.0421,
                    latitudeDelta: 0.0922} : initialRegion}
                    showsUserLocation={locPerms}
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
