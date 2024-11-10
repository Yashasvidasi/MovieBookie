import { View, Text, Image, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const History = () => {
  const [bookingDetails, setBookingDetails] = useState<any[]>([]);

  useEffect(() => {
    // Retrieve saved booking details from SecureStore
    const fetchBookingDetails = async () => {
      try {
        const savedDetails = await SecureStore.getItemAsync("bookingDetails");
        if (savedDetails) {
          setBookingDetails(JSON.parse(savedDetails)); // Parse the saved JSON data
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, []);

  // Format date function for displaying the booking date
  const formatDate = (inputDate: string | number | Date) => {
    if (inputDate instanceof Date) {
      return inputDate.toLocaleDateString(); // If it's already a Date object
    }
    if (typeof inputDate === "string") {
      return new Date(inputDate).toLocaleDateString(); // If it's a string, convert to Date
    }
    return ""; // Default if invalid input
  };

  const truncate = (str: string, maxLength: number) => {
    return str.length > maxLength
      ? str.substring(0, maxLength - 3) + "..."
      : str;
  };

  return (
    <View className="h-screen w-screen bg-black">
      <View
        className="flex flex-row justify-between w-full"
        style={{
          padding: 5,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          className="self-center"
          style={{
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <Image
            style={{
              tintColor: "#E7384D", // Apply tint color
              transform: [{ rotate: "180deg" }], // Properly apply rotation as an array
              height: 27,
              width: 27,
              alignSelf: "center",
            }}
            source={require("../../../assets/right-arrow.png")}
          />
        </Pressable>
        <Text className="text-[#E7384D] text-3xl font-bold text-center self-center">
          Booked Tickets
        </Text>
      </View>
      <ScrollView className="bg-black" contentContainerStyle={{ padding: 20 }}>
        {bookingDetails.length > 0 ? (
          bookingDetails.map((booking, index) => (
            <View
              key={index}
              className="flex-row bg-[#1C1C1E] rounded-2xl mb-5 shadow-lg overflow-hidden border border-gray-500 relative"
            >
              {/* Left Semicircle Cut-out */}
              <View
                style={{
                  position: "absolute",
                  left: -10,
                  top: "50%",
                  transform: [{ translateY: -15 }],
                  width: 30,
                  height: 30,
                  backgroundColor: "black",
                  borderRadius: 15,
                }}
              />

              {/* Right Semicircle Cut-out */}
              <View
                style={{
                  position: "absolute",
                  right: -10,
                  top: "50%",
                  transform: [{ translateY: -15 }],
                  width: 30,
                  height: 30,
                  backgroundColor: "black",
                  borderRadius: 15,
                }}
              />

              {/* Movie Poster */}
              <Image
                style={{
                  height: 150,
                  width: 100,
                  borderRadius: 15,
                  marginLeft: 5,
                  alignSelf: "center",
                }}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${booking.poster}`,
                }}
              />

              {/* Ticket Details */}
              <View className="flex-1 p-3">
                <Text className="text-white text-lg font-semibold mb-1">
                  {truncate(booking.title, 18)}
                </Text>
                <Text className="text-gray-300 text-sm mb-1">English U/A</Text>
                <Text className="text-gray-300 text-sm mb-1">
                  {formatDate(booking.date)}, {booking.time}
                </Text>
                <Text className="text-gray-300 text-sm mb-1">
                  {booking.theater}
                </Text>
                <Text className="text-gray-300 text-sm mb-1">
                  Seat No: {booking.seatnumbers}
                </Text>
                <Text className="text-white text-lg font-bold mt-2">
                  ₹ {booking.cost}
                </Text>
              </View>

              {/* QR Code Section */}
              <View className="w-30 bg-gray-800 flex items-center justify-center p-3 border-l border-dashed border-gray-500">
                <View
                  style={{
                    height: 60,
                    width: 60,
                    backgroundColor: "white",
                    borderRadius: 4,
                  }}
                >
                  <Image
                    style={{
                      tintColor: "black", // Apply tint color
                      transform: [{ rotate: "180deg" }], // Properly apply rotation as an array
                      height: 60,
                      width: 60,
                    }}
                    source={require("../../../assets/qr.png")}
                  />
                </View>
                <Text className="text-gray-400 text-sm mt-2 text-nowrap">
                  DB 132-567
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text className="text-white text-center text-3xl">
            No booking history available
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default History;
