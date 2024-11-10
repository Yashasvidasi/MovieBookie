import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store"; // Import SecureStore

const ConfirmSelection = () => {
  const { title, time, theater, seats, cost, poster, seatnumbers, date } =
    useLocalSearchParams<{
      title: any;
      time: any;
      theater: any;
      seats: any;
      cost: any;
      poster: any;
      seatnumbers: any;
      date: any;
    }>();

  const [totalCost, setTotalCost] = useState(parseFloat(cost)); // Parse cost as a number
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [additionalItems, setAdditionalItems] = useState({
    popcorn: 0,
    drinks: 0,
  });

  const itemPrices = {
    popcorn: 150,
    drinks: 100,
  };

  const applyPromoCode = () => {
    if (promoCode === "SAVE10") {
      setDiscount(0.1 * totalCost); // 10% discount
      Keyboard.dismiss();
    } else {
      setDiscount(0);
      alert("Invalid Promo Code");
    }
  };

  const addItem = (item: "popcorn" | "drinks") => {
    setAdditionalItems((prevItems) => ({
      ...prevItems,
      [item]: prevItems[item] + 1,
    }));
    setTotalCost((prevTotal) => prevTotal + itemPrices[item]);
  };

  const removeItem = (item: "popcorn" | "drinks") => {
    if (additionalItems[item] > 0) {
      setAdditionalItems((prevItems) => ({
        ...prevItems,
        [item]: prevItems[item] - 1,
      }));
      setTotalCost((prevTotal) => prevTotal - itemPrices[item]);
    }
  };

  const formatDate = (inputDate: string | number | Date) => {
    if (inputDate instanceof Date) {
      return inputDate.toLocaleDateString(); // If it's already a Date object
    }
    if (typeof inputDate === "string") {
      return new Date(inputDate).toLocaleDateString(); // If it's a string, convert to Date
    }
    return ""; // Default if invalid input
  };

  // Calculate final total after applying discount
  const finalTotal = totalCost - discount;

  const saveBookingDetails = async (obj: {
    title: any;
    time: any;
    theater: any;
    seats: any;
    cost: number;
    poster: any;
    seatnumbers: any;
    date: any;
  }) => {
    try {
      // Retrieve the current booking details from SecureStore
      let bookingDetails = await SecureStore.getItemAsync("bookingDetails");

      // If no data is found, initialize an empty array
      if (!bookingDetails) {
        bookingDetails = JSON.stringify([]); // Initialize as empty array
      }

      // Parse the booking details string back to an array
      let bookingArray = JSON.parse(bookingDetails);

      // Push the new booking object into the array
      bookingArray.push(obj);

      // Save the updated array back to SecureStore
      await SecureStore.setItemAsync(
        "bookingDetails",
        JSON.stringify(bookingArray)
      );

      alert("Booking Confirmed!");

      // Navigate after storing the data
      router.dismissAll();
      router.navigate("../History/History");
    } catch (error) {
      console.error("Error storing booking details:", error);
    }
  };

  const truncate = (str: string, maxLength: number) => {
    return str.length > maxLength
      ? str.substring(0, maxLength - 3) + "..."
      : str;
  };

  return (
    <ScrollView className="w-screen h-screen bg-black px-5">
      <View
        style={{
          padding: 10,
          paddingLeft: 0,
          marginBottom: 20,
        }}
        className="w-full flex flex-row justify-between"
      >
        <Pressable onPress={() => router.back()}>
          <Image
            className="my-auto"
            style={{
              tintColor: "#E7384D", // Apply tint color
              transform: [{ rotate: "180deg" }], // Properly apply rotation as an array
              height: 26,
              width: 26,
            }}
            source={require("../../../assets/right-arrow.png")}
          />
        </Pressable>
        <Text className="text-[#E7384D] text-3xl text-right font-bold">
          Confirm Your Booking
        </Text>
      </View>

      {/* Ticket Style Booking Summary */}
      <View className="flex-row bg-[#1C1C1E] rounded-2xl mb-5 shadow-lg overflow-hidden border border-gray-500 relative">
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
            uri: `https://image.tmdb.org/t/p/w500${poster}`,
          }}
        />

        {/* Ticket Details */}
        <View className="flex-1 p-3">
          <Text className="text-white text-lg font-semibold mb-1">
            {truncate(title, 18)}
          </Text>
          <Text className="text-gray-300 text-sm mb-1">English U/A</Text>
          <Text className="text-gray-300 text-sm mb-1">
            {formatDate(date)}, {time}
          </Text>
          <Text className="text-gray-300 text-sm mb-1">{theater}</Text>
          <Text className="text-gray-300 text-sm mb-1">
            Seat No: {seatnumbers}
          </Text>
          <Text className="text-white text-lg font-bold mt-2">₹ {cost}</Text>
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

      {/* Additional Items */}
      <Text className="text-[#E7384D] text-xl font-bold mt-5 mb-3">
        Add Items
      </Text>
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-white text-lg">
          Popcorn (₹{itemPrices.popcorn} each)
        </Text>
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => removeItem("popcorn")}
            className="w-8 h-8 bg-[#E7384D] rounded-full flex items-center justify-center"
          >
            <Text className="text-white text-lg font-bold">-</Text>
          </TouchableOpacity>
          <Text className="text-white text-lg mx-3">
            {additionalItems.popcorn}
          </Text>
          <TouchableOpacity
            onPress={() => addItem("popcorn")}
            className="w-8 h-8 bg-[#E7384D] rounded-full flex items-center justify-center"
          >
            <Text className="text-white text-lg font-bold">+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-white text-lg">
          Pepsi (₹{itemPrices.drinks} each)
        </Text>
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => removeItem("drinks")}
            className="w-8 h-8 bg-[#E7384D] rounded-full flex items-center justify-center"
          >
            <Text className="text-white text-lg font-bold">-</Text>
          </TouchableOpacity>
          <Text className="text-white text-lg mx-3">
            {additionalItems.drinks}
          </Text>
          <TouchableOpacity
            onPress={() => addItem("drinks")}
            className="w-8 h-8 bg-[#E7384D] rounded-full flex items-center justify-center"
          >
            <Text className="text-white text-lg font-bold">+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Promo Code */}
      <Text className="text-[#E7384D] text-xl font-bold mt-5">
        Apply Promo Code
      </Text>
      <View className="flex-row items-center mt-3">
        <TextInput
          className="flex-1 h-10 border border-gray-400 rounded-lg px-3 text-white bg-gray-800"
          placeholder="Enter Promo SAVE10"
          placeholderTextColor="gray"
          value={promoCode}
          onChangeText={setPromoCode}
        />
        <TouchableOpacity
          onPress={applyPromoCode}
          className="ml-3 bg-[#E7384D] py-2 px-5 rounded-lg"
        >
          <Text className="text-white text-lg">Apply</Text>
        </TouchableOpacity>
      </View>

      {/* Total Cost */}
      <View className="mt-8 bg-gray-800 p-4 rounded-lg">
        <Text className="text-white text-xl font-bold">
          Total Cost: ₹ {finalTotal}{" "}
          {discount > 0 && `(Discount applied: ₹${discount})`}
        </Text>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity
        className="mt-10 bg-[#E7384D] py-4 rounded-lg items-center mb-24"
        onPress={() => {
          const obj = {
            title: title,
            time: time,
            theater: theater,
            seats: seats,
            cost: totalCost,
            poster: poster,
            seatnumbers: seatnumbers,
            date: date,
          };

          saveBookingDetails(obj);
        }}
      >
        <Text className="text-white text-lg font-bold">Confirm and Pay</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ConfirmSelection;
