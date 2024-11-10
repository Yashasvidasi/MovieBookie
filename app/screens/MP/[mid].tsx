import React, { useState, useEffect } from "react";

import CastCard from "./castcard";
import ReviewCard from "./reviewcard";

import {
  LogBox,
  Animated,
  ImageBackground,
  Image,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
LogBox.ignoreAllLogs(true);

const MoviePage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setdata] = useState<any>([]);
  const [cast, setcast] = useState<any>([]);
  const [rev, setrev] = useState<any>([]);
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const servers = ["to", "me", "in", "pm", "net", "xyz"];
  const [server, setserver] = useState(0);

  const [showoptions, setshowoptions] = useState(false);

  const [scale] = useState(new Animated.Value(1)); // Start with scale = 1

  const onPressIn = () => {
    // Animate the scale to 0.5 when the button is pressed
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    // Animate the scale back to 1 when the button is released
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const handleChange = ({ window }: { window: any }) => {
      setDimensions(window);
    };

    const subscription = Dimensions.addEventListener("change", handleChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  const castaddition = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTI2ZjQ4ZDUxZjMxZmY3ZjkxOWQ1ZGNhNGI3MTE4YSIsInN1YiI6IjY2NDM1ZWQ5MzcxZDAyMjk5OTM1ODE0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g9l6vyjgQSIDdr_4tQckUixPEoSjaMzevcnvlZWE5Bw",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setcast(json["cast"]))
      .catch((err) => console.error("error:" + err));
  };

  const revaddition = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTI2ZjQ4ZDUxZjMxZmY3ZjkxOWQ1ZGNhNGI3MTE4YSIsInN1YiI6IjY2NDM1ZWQ5MzcxZDAyMjk5OTM1ODE0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g9l6vyjgQSIDdr_4tQckUixPEoSjaMzevcnvlZWE5Bw",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setrev(json["results"]))
      .catch((err) => console.error("error:" + err));
  };

  const dataaddition = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
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
      .then((json) => setdata(json))
      .catch((err) => console.error(":" + err));
  };

  useEffect(() => {
    dataaddition();
    castaddition();
    revaddition();
  }, [id]);
  return (
    <ImageBackground
      style={{ flex: 1 }}
      blurRadius={3}
      resizeMode="cover"
      source={{
        uri: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`,
      }}
    >
      <SafeAreaView className="bg-transparent">
        <View className="flex flex-col justify-center bg-transparent">
          <ScrollView
            style={{ backgroundColor: "black" }}
            className="flex flex-col -z-10"
          >
            <View className="flex flex-row flex-wrap justify-evenly">
              <View className="rounded-lg shadow-2xl shadow-black mt-8 mx-8">
                <Image
                  style={{
                    height: 350,
                    width: 260,
                    borderRadius: 15,
                    shadowColor: "#E7384D",
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.9,
                    shadowRadius: 6,
                  }}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
                  }}
                />
              </View>
              <View
                style={{ maxWidth: 360 }}
                className="flex flex-col mt-9 text-[#E7384D]"
              >
                <Text
                  style={{
                    fontSize: 35,
                    fontWeight: "900",
                    marginBottom: "10%",
                  }}
                  className="text-center text-[#E7384D] font-semibold"
                >
                  {data.title || data.name}
                </Text>
                <Text className="text-2xl mt-1 text-[#E7384D] font-bold text-center">
                  Overview
                </Text>
                <Text
                  style={{ marginBottom: "7%" }}
                  className="text-lg mt-2 text-justify text-white"
                >
                  {data.overview}
                </Text>
                <Text className="text-2xl text-[#E7384D] font-bold text-center">
                  Genres
                </Text>

                <Text
                  className="text-lg mb-4 text-center text-white mt-2"
                  style={{ marginBottom: "10%" }}
                >
                  {data.genres
                    ? data.genres.map((item: { name: any }, index: number) => {
                        return index === 0 ? `${item.name}` : `, ${item.name}`;
                      })
                    : null}
                </Text>

                <Text className="text-2xl text-[#E7384D] font-bold text-center">
                  Release Date
                </Text>

                <Text
                  className="text-lg text-center text-white mt-2"
                  style={{ marginBottom: "10%" }}
                >
                  {data.release_date}
                </Text>
                <Text className="text-2xl text-[#E7384D] font-bold text-center">
                  Languages
                </Text>
                <Text
                  className="text-lg mt-2 text-white text-center"
                  style={{ marginBottom: "10%" }}
                >
                  {data.spoken_languages
                    ? data.spoken_languages.map(
                        (item: { english_name: any }, index: number) => {
                          return index === 0
                            ? `${item.english_name}`
                            : `, ${item.english_name}`;
                        }
                      )
                    : null}
                </Text>
              </View>
            </View>

            <Text className="text-2xl mt-1 text-[#E7384D] font-bold text-center">
              Cast
            </Text>
            <ScrollView
              style={{ marginBottom: "10%" }}
              className="mt-5 ml-2"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {cast
                ? cast
                    .slice(0, 16)
                    .map(
                      (item: { profile_path: any; name: any }, index: any) => {
                        return item.profile_path ? (
                          <CastCard
                            key={index}
                            poster_path={item.profile_path}
                            name={item.name}
                          />
                        ) : null;
                      }
                    )
                : null}
            </ScrollView>

            <Text className="text-2xl mt-1 text-[#E7384D] font-bold text-center">
              Reviews
            </Text>
            <View className="mt-4 self-center flex flex-col mb-44">
              {rev ? (
                rev.length !== 0 ? (
                  rev.map(
                    (
                      item: {
                        author: any;
                        author_details: {
                          username: any;
                          avatar_path: any;
                          rating: any;
                        };
                        content: any;
                      },
                      index: any
                    ) => {
                      return (
                        <ReviewCard
                          key={index}
                          name={item.author}
                          user={item.author_details.username}
                          profile={item.author_details.avatar_path}
                          rate={item.author_details.rating}
                          text={item.content}
                        />
                      );
                    }
                  )
                ) : (
                  <Text className="text-white text-lg mt-2">
                    No Reviews Yet
                  </Text>
                )
              ) : null}
            </View>
          </ScrollView>
        </View>

        <Pressable
          onPress={() => router.back()}
          style={{
            borderWidth: 1,

            position: "absolute",
            top: 20,
            left: 5,
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: 50,
            padding: 4,
            paddingLeft: 4,
          }}
        >
          <Image
            style={{
              tintColor: "#E7384D", // Apply tint color
              transform: [{ rotate: "180deg" }], // Properly apply rotation as an array
              height: 26,
              width: 26,
            }}
            source={require("../../../assets/right-arrow.png")}
          />
        </Pressable>

        {/* Book Button - Fixed */}
        <Animated.View style={{ transform: [{ scale: scale }] }}>
          <Pressable
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={() => {
              router.push({
                pathname: "/screens/LP/LandingPage",
                params: { title: data.title, poster: data.poster_path },
              });
            }}
            className="self-center"
            style={{
              position: "absolute",
              bottom: 20,
              width: "85%",
              marginHorizontal: "auto",
              zIndex: 1,
              backgroundColor: "#E7384D", // Red color like BookMyShow's button
              paddingVertical: 12,
              paddingHorizontal: 30,
              borderRadius: 25,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Book Now
            </Text>
          </Pressable>
        </Animated.View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default MoviePage;
