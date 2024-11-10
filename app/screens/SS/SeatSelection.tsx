import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

const SeatSelection = () => {
  const { time, title, theater, poster, date } = useLocalSearchParams();
  const [sseats, setsseats] = useState(0);
  const [cost, setcost] = useState(0);
  const [buyseats, setbuyseats] = useState<any[]>([]);
  const seatcost = {
    1: 200,
    2: 250,
    3: 390,
  };
  const rows1 = ["A", "B", "C", "D", "E", "F", "G"];
  const rows2 = ["H", "I", "J", "K"];
  const rows3 = ["L"];
  const seatsPerRow = 12;

  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  const bookedSeats = ["E3", "E4", "F6", "H2", "I5", "J8", "L1", "L2"];

  const toggleSeatSelection = (seat: string, set: 1 | 2 | 3) => {
    const seatCostForSet = seatcost[set];

    if (selectedSeats.includes(seat)) {
      // Remove seat if it’s already selected
      setsseats(sseats - 1);
      setcost(cost - seatCostForSet);
      setbuyseats(buyseats.filter((s) => s !== seat));
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter((s) => s !== seat)
      );
    } else {
      // Add seat if it’s not already selected
      setsseats(sseats + 1);
      setcost(cost + seatCostForSet);
      setbuyseats([...buyseats, seat]);
      setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seat]);
    }
  };

  const renderSeat = (row: any, index: number, set: 1 | 2 | 3) => {
    const seatId = `${row}${index + 1}`;
    const isBooked = bookedSeats.includes(seatId);
    const isSelected = selectedSeats.includes(seatId);

    return (
      <TouchableOpacity
        key={seatId}
        style={[
          styles.seat,
          isBooked
            ? styles.bookedSeat
            : isSelected
            ? styles.selectedSeat
            : styles.availableSeat,
        ]}
        disabled={isBooked}
        onPress={() => toggleSeatSelection(seatId, set)}
      >
        <Text style={styles.seatText}>{index + 1}</Text>
      </TouchableOpacity>
    );
  };

  const renderRow = (row: string, set: 1 | 2 | 3) => (
    <View style={styles.row} key={row}>
      <Text style={styles.rowLabel}>{row}</Text>
      {Array.from({ length: seatsPerRow }, (_, index) =>
        renderSeat(row, index, set)
      )}
    </View>
  );

  const truncate = (str: any, maxLength: number) => {
    return str.length > maxLength
      ? str.substring(0, maxLength - 3) + "..."
      : str;
  };

  return (
    <View className="w-screen h-screen bg-black">
      <View style={styles.header}>
        <View className="flex flex-row justify-between w-screen">
          <Pressable
            onPress={() => router.back()}
            style={{
              zIndex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: 50,
              padding: 5,
              paddingLeft: 4,
              alignSelf: "center",
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
          <Text style={styles.title}>{truncate(title, 25)}</Text>
        </View>
        <Text style={styles.subTitle}>
          {time} | {theater}
        </Text>
      </View>
      <Text style={styles.screenLabel}>Eyes this way</Text>
      <View style={styles.screen} />
      <View>
        <Text style={styles.sectionCost}>Section 1 - ₹{seatcost[1]}</Text>
        <FlatList
          className="mb-1"
          data={rows1}
          renderItem={({ item }) => renderRow(item, 1)}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.seatMap}
        />

        <Text style={styles.sectionCost}>Section 2 - ₹{seatcost[2]}</Text>
        <FlatList
          data={rows2}
          className="mb-1"
          renderItem={({ item }) => renderRow(item, 2)}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.seatMap}
        />

        <Text style={styles.sectionCost}>Section 3 - ₹{seatcost[3]}</Text>
        <FlatList
          data={rows3}
          renderItem={({ item }) => renderRow(item, 3)}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.seatMap}
        />
      </View>
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.bookedSeat]} />
          <Text style={styles.legendText}>Booked</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.availableSeat]} />
          <Text style={styles.legendText}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.selectedSeat]} />
          <Text style={styles.legendText}>Selected</Text>
        </View>
      </View>
      <Pressable
        onPress={() => {
          if (sseats > 0) {
            router.push({
              pathname: "../CS/ConfirmSelection",
              params: {
                title: title,
                theater: theater,
                time: time,
                seats: sseats,
                cost: cost,
                poster: poster,
                seatnumbers: buyseats,
                date: date,
              },
            });
          }
        }}
        className="self-center"
        style={{
          position: "absolute",
          bottom: 20,
          width: "85%",
          marginHorizontal: "auto",
          zIndex: 1,
          backgroundColor: "#E7384D",
          paddingVertical: 12,
          paddingHorizontal: 30,
          borderRadius: 25,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          {sseats} Seats for ₹ {cost}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 7,
    alignSelf: "center",
  },
  subTitle: {
    color: "#E7384D",
    marginTop: 10,
    alignSelf: "flex-end",
    marginRight: 7,
    fontSize: 16,
  },
  screenLabel: {
    color: "#E7384D",
    textAlign: "center",
    fontSize: 21,
    fontWeight: "600",
    marginBottom: 4,
  },
  screen: {
    backgroundColor: "#333",
    height: 4,
    width: "80%",
    alignSelf: "center",
    borderRadius: 5,
    marginBottom: 24,
  },
  sectionCost: {
    color: "#E7384D",
    fontSize: 16,
    marginLeft: 20,
    marginTop: 3,
  },
  seatMap: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  rowLabel: {
    color: "#fff",
    fontSize: 14,
    width: 20,
    textAlign: "center",
    marginRight: 8,
  },
  seat: {
    width: 20,
    height: 20,
    margin: 4,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  seatText: {
    color: "#000",
    fontSize: 10,
  },
  bookedSeat: {
    backgroundColor: "#555",
  },
  availableSeat: {
    backgroundColor: "#fff",
  },
  selectedSeat: {
    backgroundColor: "#E7384D",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  legendBox: {
    width: 16,
    height: 16,
    marginRight: 6,
    borderRadius: 4,
  },
  legendText: {
    color: "#fff",
    fontSize: 12,
  },
});

export default SeatSelection;
