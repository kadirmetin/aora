import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

const App = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl font-pblack">Aora</Text>
      <Link href={"home"} className="text-blue-500">
        Go to Home
      </Link>
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
