import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

const Profile = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl">Profile</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default Profile;
