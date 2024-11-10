import React, { memo } from "react";

import { Image, View, Text } from "react-native";

const ReviewCard = (props) => {
  return (
    <View
      style={{
        width: 320,
        marginHorizontal: 5,
        marginBottom: 25,
        borderRadius: 20,
        borderColor: "#E7384D",
        padding: 20,
      }}
      className="flex flex-col h-fit p-5 bg-slate-950 border border-[#E7384D]"
    >
      <View className="flex flex-row">
        <View className="relative w-6 h-6 border border-white rounded-full mr-3 self-center items-center justify-center">
          <Image
            className="absolute h-8 w-8 rounded-full z-10"
            source={{
              uri: `https://image.tmdb.org/t/p/w500${props.profile}`,
            }}
          />
          <Image
            className=" absolute h-4 w-4 rounded-full z-0"
            tintColor={"white"}
            source={require("../../../assets/search.png")}
          />
        </View>

        <Text className="text-base text-center mr-2 text-white">
          {props.name}
        </Text>
        <Text className="text-base text-center text-white">@{props.user}</Text>
      </View>
      <View className="mt-3">
        <Text
          style={{ marginVertical: 10 }}
          className="text-base text-white text-center"
        >
          Rating: {props.rate}
        </Text>
      </View>
      <View className="mt-3">
        <Text className="text-base text-white text-center">{props.text}</Text>
      </View>
    </View>
  );
};

export default memo(ReviewCard);
