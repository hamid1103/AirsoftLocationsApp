import Ionicons from '@expo/vector-icons/Ionicons';
import {StyleSheet, Image, Platform, View, Text, SafeAreaView} from 'react-native';
import {styled} from "nativewind";

export default function TabTwoScreen() {

  const StyledView = styled(View)
  const StyledText = styled(Text)

  return (
      <SafeAreaView>
        <StyledView className="flex flex-col">
          <StyledText className="text-gold text-xl">Hello</StyledText>
        </StyledView>
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
