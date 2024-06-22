import {Pressable, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {LikeButton} from "./LikeButton";

export function LocationListButton({loco, navigation, isLiked, likes, setLikes}) {
    //Gebruik pressables omdat <button>s lelijk zijn
    return (
        <Pressable
            onPress={()=>{
                //Stuur Latitude en longitude naar map
                navigation.navigate('Map', {
                    LocLatLng: loco.LatLng
                })
            }}>
            <View
                className="p-2 w-screen flex flex-row mb-3 rounded-2xl bg-gray-300 dark:bg-black pb-3 pt-3 pl-1 pr-1 items-center"
            >
                <View className="flex flex-col w-11/12">
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
                <View className="w-1/12 flex flex-col justify-center align-middle">
                    <LikeButton isLiked={isLiked} setLikes={setLikes} likes={likes} name={loco.name} key={"likeB"+loco.name}></LikeButton>
                </View>
            </View>
        </Pressable>
    );
}