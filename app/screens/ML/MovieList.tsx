import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import React, { useState, useEffect, memo } from "react";
import ListCard from "@/components/ListCard/ListCard";
import { router } from "expo-router";

const MovieList = () => {
  const [newmovies, setnewmovies] = useState<any[]>([]);
  const [page, setpage] = useState(1);

  const appender = (data: { [x: string]: any }) => {
    setnewmovies((prevnewMovies) => {
      const existingIds = new Set(prevnewMovies.map((movie) => movie.id));
      const newnewMovies = [...prevnewMovies];

      for (const a of data["results"]) {
        if (!existingIds.has(a.id)) {
          newnewMovies.push({
            id: a.id,
            poster_path: a.poster_path,
            title: a.title || a.name,
          });
        }
      }
      return newnewMovies;
    });
  };

  const newmovieaddition = async (page: number) => {
    const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTI2ZjQ4ZDUxZjMxZmY3ZjkxOWQ1ZGNhNGI3MTE4YSIsInN1YiI6IjY2NDM1ZWQ5MzcxZDAyMjk5OTM1ODE0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g9l6vyjgQSIDdr_4tQckUixPEoSjaMzevcnvlZWE5Bw", // Replace with your actual API key
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => appender(json))
      .catch((err) => console.error(":" + err));
  };

  useEffect(() => {
    newmovieaddition(page);
  }, [page]);

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
          Upcoming Movies
        </Text>
      </View>
      <FlatList
        className="self-center"
        data={newmovies}
        numColumns={2} // Set the number of columns to 2
        renderItem={({ item }) => (
          <ListCard
            id={item.id}
            poster={item.poster_path}
            title={item.title}
            rating={Math.round(item.id / 1000)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => {
          setpage((prevPage) => prevPage + 1);
        }}
        onEndReachedThreshold={0.5} // Adjust this value as needed
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer} // Apply custom content container styles
        ListFooterComponent={() => (
          <View
            style={{ zIndex: 0, height: 240, width: 160 }}
            className="max-w-fit max-h-fit p-1 m-5 mb-10 mt-2 flex flex-col "
          >
            <View className="h-full w-full border-2 border-white shadow-2xl shadow-black flex flex-row justify-center"></View>
            <View className="flex flex-wrap flex-row align-middle justify-center self-center p-2  w-32">
              <Text className="text-white align-middle text-center">
                loading
              </Text>
            </View>
          </View>
        )}
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
