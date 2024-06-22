import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
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
import * as LocalAuthentication from 'expo-local-authentication';

const Stack = createNativeStackNavigator();
const Tab = CreateBottomTabNavigator();

export default function App() {
    const {colorScheme, setColorScheme} = useColorScheme();
    const [initTheme, setInitTheme] = useState(false);
    const [likes, setLikes] = useState([])
    const [likesInit, setLikesInit] = useState(false)
    const [auth, setAuth] = useState(false)
    const [Locations, SetLocations] = useState({set: false, error: false, data: []});

    //Verander en bewaar kleuren van de app
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

    //Bewaar Like Veranderingen
    useEffect(()=>{
        (async ()=>{
            console.log("Called Save with auth: " + auth + " and likes init: " + likesInit)
            if(likesInit===true){
                if(auth === true)
                {
                    let storeData = JSON.stringify(likes)
                    await AsyncStorage.setItem('likes', storeData)
                    console.log(`saved ${storeData}`)
                }else
                {
                    Alert.alert("Saving Likes", "Likes can't be saved without authentication.",[
                        {text: 'Cancel', style: 'cancel'}
                    ])
                }
            }
        })();
    }, [likes])

    //Fonts moeten eerst geregistreerd zijn in expo voordat ze werken in nativewind(tailwind)
    const [fontsLoaded, fontError] = useFonts({
        'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
        'Cinzel-Black': require('./assets/fonts/Cinzel-Black.ttf')
    });

    //Code om af te spelen wanneer de app aan is
    useEffect(() => {
        //Locations zit in root component zodat ik ze niet steeds hoef te fetchen per pagina.
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

        //Get Authentication to save likes
        (async ()=>{
            let {success} = await LocalAuthentication.authenticateAsync({promptMessage:"Do you want to save likes on your phone?",cancelLabel:"Don't save likes on my phone"})
            console.log(success)
            setAuth(success)
        })();

        //Haal layout instellingen op uit storage
        (async ()=>{
            const themeval = await AsyncStorage.getItem('theme')
            setColorScheme(themeval)
            console.log("Fetched theme: " + themeval);
            setInitTheme(true)
        })();

        //Haal likes op uit storage
        (async ()=>{
           const clikes = await AsyncStorage.getItem('likes');
           if(clikes===null)
           {
               setLikes([])
               setLikesInit(true)
               return
           }
           console.log(`Likes found: ${clikes}`)
           setLikes(JSON.parse(clikes));
           setLikesInit(true)
        })()

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
                                     color: colorScheme === 'dark' ? colors.white : colors.black,
                                 },
                                 tabBarStyle: {
                                     backgroundColor: colorScheme === 'dark' ? '#1D1D1D' : colors.white
                                 }
                             }}>
                <Stack.Screen name="Home">
                    {(props) => <HomePage {...props} Locations={Locations} likes={likes} setLikes={setLikes}/>}
                </Stack.Screen>
                <Stack.Screen name="Map">
                    {props => <Map {...props} Locations={Locations}></Map>}
                </Stack.Screen>
                <Stack.Screen name="Settings">
                    {/*Geef Color State function door om hem in settings te veranderen*/}
                    {props => <SettingsPage {...props} colorScheme={colorScheme} setLikes={setLikes} setColorScheme={setColorScheme}></SettingsPage>}
                </Stack.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
