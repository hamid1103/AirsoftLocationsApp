import {Ionicons} from "@expo/vector-icons";
import {Pressable} from "react-native";
import {useEffect, useState} from "react";

export function LikeButton({setLikes, likes, name}) {
    const [isLiked, setIsLiked] = useState(false)
    useEffect(()=>{
        if(likes.includes(name))
        {
            setIsLiked(true)
        }
    },[])

    useEffect(()=>{
        setIsLiked(likes.includes(name))
    },[likes])

    return isLiked?<Pressable onPress={()=>{
        setLikes(likes.filter((loc)=>loc!==name))
        setIsLiked(false)
    }}>
        <Ionicons name="heart-circle-outline" size="25" color="red"></Ionicons>
    </Pressable> : <Pressable onPress={()=>{
        setLikes([...likes, name])
        setIsLiked(true)
    }}>
        <Ionicons name="heart-circle" size="25" color="white"></Ionicons>
    </Pressable>
}