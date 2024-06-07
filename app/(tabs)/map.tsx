import Ionicons from '@expo/vector-icons/Ionicons';
import {StyleSheet, Image, Platform, View, Text, SafeAreaView} from 'react-native';
import {styled} from "nativewind";
import MapView, {Marker} from "react-native-maps";
import {useEffect, useState} from "react";
import {Loc} from "sucrase/dist/types/parser/traverser/base";

//MarkerLoader zit in een aparte functie zodat de map zelf niet helemaal hoeft te reloaden elke keer als de locaties worden opgehaald.
export function MarkerLoader()
{
    const [Locations, SetLocations] = useState({set: false, error: false, data: []});
    useEffect(() => {
        (async () => {
            await fetch("https://stud.hosted.hr.nl/1062604/AirsoftLocations2.json", {
                headers: {
                    'Cache-Control': 'no-cache'
                }
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json.data[1])
                    SetLocations({set: true, error: false, data: json.data})
                })
                .catch(e => {
                    SetLocations({set: false, error: true, data: e})
                })
        })();
    }, [])
    if(!Locations.set || Locations.error)
    {
        return(<></>)
    }

    return (
            Locations.data.map((loco, index) => (
                <Marker
                    key={index}
                    // @ts-ignore
                    coordinate={loco.LatLng}
                    // @ts-ignore
                    title={loco.name}
                    // @ts-ignore
                    description={loco.description}
                />
            ))
    )

}

export default function TabTwoScreen() {

    const Div = styled(View)
    const StyledText = styled(Text)
    const StyledMapView = styled(MapView)

    return (
        <SafeAreaView>
            <Div className="h-[10%] w-full bg-white dark:bg-cblack">

            </Div>
            <Div className="h-[90%] w-full bg-white dark:bg-cblack">
                <StyledMapView
                    className="w-full h-full"
                    initialRegion={{
                        latitude: 51.88173503246226,
                        longitude:5.301747550883823,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }
                    }>
                    <MarkerLoader></MarkerLoader>
                </StyledMapView>
            </Div>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});
