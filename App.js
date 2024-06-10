import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useFonts} from "expo-font";
import {NavigationContainer} from "@react-navigation/native";
import {HomePage} from "./pages/HomePage";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useColorScheme} from "nativewind";
import Map from "./pages/Map";
import {useEffect, useState} from "react";
import colors from "tailwindcss/colors";

const Stack = createNativeStackNavigator();

export default function App() {
  const { colorScheme, setColorScheme } = useColorScheme();
  useEffect(()=>{
    setColorScheme("dark")
  })
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
    'Cinzel-Black': require('./assets/fonts/Cinzel-Black.ttf')
  });

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
          <Stack.Navigator initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: colorScheme === 'dark' ? '#1D1D1D' : colors.white
            },
            headerTitleStyle: {
              fontFamily: "Cinzel-Black",
              color: colorScheme === 'dark' ? colors.white : colors.black
            }
          }}>
            <Stack.Screen name="Home">
              {(props)=><HomePage {...props} Locations={Locations} />}
            </Stack.Screen>
            <Stack.Screen name="Map" component={Map} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}
