import Ionicons from '@expo/vector-icons/Ionicons';
import {StyleSheet, Image, Platform, View, Text, SafeAreaView} from 'react-native';
import {styled} from "nativewind";
import MapView from "react-native-maps";

export default function TabTwoScreen() {

  const StyledView = styled(View)
  const StyledText = styled(Text)

  return (
      <SafeAreaView>
        <MapView />
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
