import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { tdata } from "@/constants/Theaters";

const generateShowtimes = () => {
  const times = ["11:00 AM", "1:00 PM", "4:00 PM", "10:00 PM"];
  const shuffledTimes = times.sort(() => 0.5 - Math.random());
  return shuffledTimes.slice(0, Math.max(2, Math.floor(Math.random() * 5)));
};

const generateShowinfo = () => {
  const info = ["Dolby 3D", "IMAX", "4DX", "ScreenX", "Dolby Atmos"];
  const shuffledTimes = info.sort(() => 0.5 - Math.random());
  return shuffledTimes.slice(0, 1);
};

const generateDates = () => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return {
      id: i,
      day: date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      date: date.getDate(),
      fullDate: date,
    };
  });
};

const DateSelector = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: any;
  setSelectedDate: any;
}) => {
  const dates = generateDates();
  return (
    <FlatList
      horizontal
      data={dates}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.dateContainer,
            item.fullDate.toDateString() === selectedDate.toDateString()
              ? styles.selectedDate
              : null,
          ]}
          onPress={() => {
            if (item.fullDate.toDateString() !== selectedDate.toDateString()) {
              setSelectedDate(item.fullDate);
            }
          }}
        >
          <Text style={styles.dayText}>{item.day}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.dateList}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const TheaterCard = ({ theater, date }: { theater: any; date: any }) => {
  const showtimes = generateShowtimes();
  const info = generateShowinfo();
  const { title, poster } = useLocalSearchParams();
  return (
    <View style={styles.card}>
      <Text style={styles.theaterName}>{theater.title}</Text>
      <Text className="text-md text-gray-400 mb-5">{info}</Text>
      <View style={styles.showtimesContainer}>
        {showtimes.map((time, index) => (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "../SS/SeatSelection",
                params: {
                  time: time,
                  title: title,
                  theater: theater.title,
                  poster: poster,
                  date: date,
                },
              });
            }}
            key={index}
            style={styles.showtimeButton}
          >
            <Text style={styles.showtimeText}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const getRandomTheaters = (data: any[]) => {
  return data
    .sort(() => 0.5 - Math.random()) // Shuffle array
    .slice(0, Math.floor(Math.random() * 2) + 4); // Select 4-5 items
};

const LandingPage = () => {
  const { title } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [randomTheaters, setRandomTheaters] = useState<any[]>([]);

  useEffect(() => {
    setRandomTheaters(getRandomTheaters(tdata));
  }, []);

  const truncate = (str: any, maxLength: number) => {
    return str.length > maxLength
      ? str.substring(0, maxLength - 3) + "..."
      : str;
  };

  return (
    <SafeAreaView className="h-screen w-screen bg-black">
      <ScrollView>
        <View style={styles.header}>
          <View style={{ flexDirection: "row" }}>
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
          </View>
          <View className="flex flex-row">
            <Text style={styles.title}>{truncate(title, 24)}</Text>
            <Image
              style={{
                tintColor: "#E7384D",
                transform: [{ rotate: "180deg" }],
                height: 24,
                width: 24,
              }}
              source={require("../../../assets/barcode-scanner.png")}
            />
          </View>
        </View>
        <DateSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>$0 - $50</Text>
          <Text style={styles.filterText}>$50 - $70</Text>
          <Text style={styles.filterText}>$70 - $90</Text>
        </View>
        <FlatList
          data={randomTheaters}
          renderItem={({ item }) => (
            <TheaterCard theater={item} date={selectedDate} />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    color: "#fff",
    fontSize: 19,
    marginRight: 14,
    fontWeight: "bold",
    alignSelf: "center",
  },
  changeText: {
    color: "#E7384D",
    fontSize: 17,
  },
  dateList: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  dateContainer: {
    alignItems: "center",
    paddingVertical: 8,

    paddingHorizontal: 16,
    borderRadius: 8,
  },
  selectedDate: {
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  dayText: {
    fontSize: 12,
    color: "#999",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
  filterText: {
    color: "#888",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#333",
    borderRadius: 20,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#222",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  theaterName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  showtimesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  showtimeButton: {
    backgroundColor: "#333",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    margin: 4,
  },
  showtimeText: {
    color: "#E7384D",
    fontSize: 14,
  },
});

export default LandingPage;
