import React, { memo } from "react";
import { Image, View, Text } from "react-native";

const CastCard = (props) => {
  return (
    <View className="flex flex-col justify-start">
      <Image
        style={{
          height: 100,
          width: 100,
          borderRadius: 200,
          marginHorizontal: 10,
        }}
        className="self-center"
        source={{
          uri: `https://image.tmdb.org/t/p/w500${props.poster_path}`,
        }}
      />
      <Text className="w-20 text-center self-center text-white">
        {props.name}
      </Text>
    </View>
  );
};

export default memo(CastCard);
