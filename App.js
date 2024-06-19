import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useFonts} from "expo-font";
import {NavigationContainer} from "@react-navigation/native";
import {HomePage} from "./pages/HomePage";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useColorScheme} from "nativewind";
import Map from "./pages/Map";
import {useEffect, useState} from "react";
import colors from "tailwindcss/colors";
import {SettingsPage} from "./pages/SettingsPage";
import CreateBottomTabNavigator from "@react-navigation/bottom-tabs/src/navigators/createBottomTabNavigator";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const Tab = CreateBottomTabNavigator();

export default function App() {
    const {colorScheme, setColorScheme} = useColorScheme();
    const [initTheme, setInitTheme] = useState(false);
    useEffect(()=>{
        (async ()=>{
            const themeval = await AsyncStorage.getItem('theme')
            setColorScheme(themeval)
            console.log("Fetched theme: " + themeval);
        })()
        setInitTheme(true)
    }, [])

    useEffect(() => {
        console.log("Switched theme to " + colorScheme + ". with initTheme bool: " + initTheme)
        if(initTheme === true)
        {
            setColorScheme(colorScheme);
            (async ()=>{
                await AsyncStorage.setItem('theme', colorScheme);
                console.log("saved theme: " + colorScheme)
            })();
        }
    }, [colorScheme, initTheme])

    //Fonts moeten eerst geregistreerd zijn in expo voordat ze werken in nativewind(tailwind)
    const [fontsLoaded, fontError] = useFonts({
        'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
        'Cinzel-Black': require('./assets/fonts/Cinzel-Black.ttf')
    });

    //Locations zit in app zodat ik ze niet steeds hoef te fetchen per pagina.
    const [Locations, SetLocations] = useState({set: false, error: false, data: []});
    useEffect(() => {
        (async () => {
            await fetch("https://stud.hosted.hr.nl/1062604/AirsoftLocations2.json")
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
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home"
                             screenOptions={{
                                 headerStyle: {
                                     backgroundColor: colorScheme === 'dark' ? '#1D1D1D' : colors.white
                                 },
                                 headerTitleStyle: {
                                     fontFamily: "Cinzel-Black",
                                     color: colorScheme === 'dark' ? colors.white : colors.black
                                 },
                                 tabBarStyle: {
                                     backgroundColor: colorScheme === 'dark' ? '#1D1D1D' : colors.white
                                 }
                             }}>
                <Stack.Screen name="Home">
                    {(props) => <HomePage {...props} Locations={Locations}/>}
                </Stack.Screen>
                <Stack.Screen name="Map">
                    {props => <Map {...props} Locations={Locations}></Map>}
                </Stack.Screen>
                <Stack.Screen name="Settings">
                    {/*Geef Color State function door om hem in settings te veranderen*/}
                    {props => <SettingsPage {...props} colorScheme={colorScheme} setColorScheme={setColorScheme}></SettingsPage>}
                </Stack.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
