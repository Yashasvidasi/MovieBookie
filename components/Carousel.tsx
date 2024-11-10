import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  Pressable,
  Dimensions,
  ListRenderItem,
  Image,
} from "react-native";

type CarouselItem = {
  id: string;
  title: string;
  path: any;
};

type CarouselProps = {
  data: CarouselItem[];
  autoPlayInterval?: number;
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const useAutoPlay = (itemCount: number, interval: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % itemCount);
    }, interval);

    return () => clearInterval(timer);
  }, [itemCount, interval]);

  return currentIndex;
};

export default function Carousel({
  data,
  autoPlayInterval = 1000,
}: CarouselProps) {
  const flatListRef = useRef<FlatList>(null);
  const currentIndex = useAutoPlay(data.length, autoPlayInterval);

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: currentIndex,
      animated: true,
    });
  }, [currentIndex]);

  const renderItem: ListRenderItem<CarouselItem> = useCallback(
    ({ item }) => (
      <View
        style={{
          width: SCREEN_WIDTH,
          height: 200, // Adjust this to your desired height
          justifyContent: "center",
          alignItems: "center",

          backgroundColor: "black", // Equivalent to bg-gray-200
        }}
      >
        <Image
          style={{ resizeMode: "contain", width: "100%", height: "100%" }}
          source={item.path}
        />
      </View>
    ),
    []
  );

  return (
    <View
      style={{
        marginTop: 8,
        borderWidth: 1,
        backgroundColor: "black",
        height: 200, // Adjust this to your desired height
      }}
    >
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />
    </View>
  );
}
