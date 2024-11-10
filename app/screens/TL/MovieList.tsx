import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import React, { memo } from "react";
import { router } from "expo-router";
import { tdata } from "@/constants/Theaters";
import TLCard from "@/components/TheaterCard/TLCard";

const MovieList = () => {
  return (
    <View className="w-screen h-screen bg-black">
      <View className="flex flex-row justify-between px-8 h-16">
        <Pressable onPress={() => router.back()}>
          <Image
            className="self-center my-auto mr-4"
            style={{
              tintColor: "#E7384D",
              transform: [{ rotate: "180deg" }],
              height: 19,
              width: 19,
            }}
            source={require("../../../assets/right-arrow.png")}
          />
        </Pressable>
        <Text className="text-3xl font-bold text-[#E7384D] text-center self-center">
          Theaters Near By
        </Text>
      </View>
      <FlatList
        className="self-center"
        data={tdata}
        numColumns={2} // Set the number of columns to 2
        renderItem={({ item }) => (
          <TLCard
            id={item.id}
            poster={item.poster}
            title={item.title}
            rating={item.rating}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReachedThreshold={0.5} // Adjust this value as needed
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer} // Apply custom content container styles
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 10, // Add vertical padding for spacing between rows
    justifyContent: "space-between", // Ensure equal space between items
  },
  item: {
    margin: 20, // Ensure uniform margin between items
  },
});

export default memo(MovieList);
