import Carousel from "@/components/Carousel";
import MovieCard from "@/components/moviecard/MovieCard";
import { router } from "expo-router";
import { useEffect, useState } from "react";

import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { StatusBar } from "react-native";
import im1 from "../assets/c1new.jpg";
import im2 from "../assets/c2new.jpg";
import im3 from "../assets/c3new.jpg";

import TCard from "@/components/TheaterCard/TCard";
import { tdata } from "@/constants/Theaters";
StatusBar.setHidden(true);

export default function Index() {
  const [movies, setmovies] = useState([]);

  const carouselData = [
    { id: "1", title: "Slide 1", path: im1 },
    { id: "2", title: "Slide 2", path: im2 },
    { id: "3", title: "Slide 3", path: im3 },
  ];

  async function fetchMovies(page: number) {
    try {
      const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTI2ZjQ4ZDUxZjMxZmY3ZjkxOWQ1ZGNhNGI3MTE4YSIsInN1YiI6IjY2NDM1ZWQ5MzcxZDAyMjk5OTM1ODE0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g9l6vyjgQSIDdr_4tQckUixPEoSjaMzevcnvlZWE5Bw`,
        },
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Failed to fetch data from API");
      }

      const data = await response.json();
      setmovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  useEffect(() => {
    fetchMovies(1);
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View className="w-screen overflow-scroll ">
          {/* Header */}
          <View className="flex flex-row justify-between items-center p-4">
            <Text className="text-[#E7384D] text-3xl font-bold">Y-Book</Text>
            <View className="flex flex-row justify-evenly w-3/6 self-center">
              <Text className="text-gray-500 self-center">Hyderabad</Text>
              <Image
                className="w-9 h-9 self-center"
                style={{ tintColor: "#E7384D" }}
                source={require("../assets/location.png")}
              />
              <Image
                className="w-7 h-7 self-center"
                style={{ tintColor: "#E7384D" }}
                source={require("../assets/search.png")}
              />
            </View>
          </View>

          <Carousel data={carouselData} autoPlayInterval={2500} />

          {/* Categories */}
          <View className="flex flex-row justify-around mt-4 mb-4">
            <View className="flex flex-col">
              <Image
                className="w-10 h-10 self-center mb-3 mt-2"
                style={{ tintColor: "#E7384D" }}
                source={require("../assets/video.png")}
              />
              <Text className="text-white text-center">Movies</Text>
            </View>
            <View className="flex flex-col">
              <Image
                className="w-10 h-10 self-center mb-3 mt-2"
                style={{ tintColor: "#E7384D" }}
                source={require("../assets/play-button.png")}
              />
              <Text className="text-white text-center">Stream</Text>
            </View>
            <View className="flex flex-col">
              <Image
                className="w-10 h-10 self-center mb-3 mt-2"
                style={{ tintColor: "#E7384D" }}
                source={require("../assets/dance.png")}
              />
              <Text className="text-white text-center">Events</Text>
            </View>
            <View className="flex flex-col">
              <Image
                className="w-10 h-10 self-center mb-3 mt-2"
                style={{ tintColor: "#E7384D" }}
                source={require("../assets/microphone.png")}
              />
              <Text className="text-white text-center">Plays</Text>
            </View>
            <View className="flex flex-col">
              <Image
                className="w-10 h-10 self-center mb-3 mt-2"
                style={{ tintColor: "#E7384D" }}
                source={require("../assets/upcoming.png")}
              />
              <Text className="text-white text-center">Shows</Text>
            </View>
          </View>
          <View className="w-screen h-fit mt-5">
            <Pressable
              className="self-center w-5/6  flex flex-row justify-evenly p-3 rounded-2xl bg-[#E7384D]"
              onPress={() => router.push("./screens/History/History")}
            >
              <Text className="text-white text-xl self-center font-semibold">
                Show Booked Tickets
              </Text>
              <Image
                className="w-10 h-10 self-center"
                style={{ tintColor: "white" }}
                source={require("../assets/tk.png")}
              />
            </Pressable>
          </View>

          {/* New Releases Section */}
          <View className="ml-4 mb-2 flex flex-row justify-between p-1 mt-9">
            <Text className="text-[#E7384D] text-2xl font-bold self-center">
              New Releases:
            </Text>
            <Pressable
              className="self-center mr-5"
              onPress={() => {
                router.push("/screens/ML/MovieList");
              }}
            >
              <Image
                className="w-6 h-6 "
                style={{ tintColor: "#E7384D" }}
                source={require("../assets/right-arrow.png")}
              />
            </Pressable>
          </View>

          {/* Movie Cards */}
          <FlatList
            data={movies}
            horizontal
            renderItem={({ item }: { item: any }) => (
              <MovieCard
                id={item.id}
                poster={item.poster_path}
                title={item.title}
                rating={Math.round(item.id / 1000)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 3 }}
          />

          {/* New Releases Section */}
          <View className="ml-4 mb-2 flex flex-row justify-between p-1 mt-5">
            <Text className="text-[#E7384D] text-2xl font-bold self-center">
              Theater Near By:
            </Text>
            <Pressable
              className="self-center mr-5"
              onPress={() => {
                // @ts-ignore
                router.push("/screens/TL/MovieList");
              }}
            >
              <Image
                className="w-6 h-6 "
                style={{ tintColor: "#E7384D" }}
                source={require("../assets/right-arrow.png")}
              />
            </Pressable>
          </View>

          <FlatList
            data={tdata}
            horizontal
            renderItem={({ item }: { item: any }) => (
              <TCard
                id={item.id}
                poster={item.poster}
                title={item.title}
                rating={item.rating}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 3 }}
          />

          {/* Footer Navigation */}
        </View>
        <View className="mb-10">
          <Text> </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
