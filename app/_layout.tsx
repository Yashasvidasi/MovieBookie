import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="screens/LP/LandingPage"
        options={{
          animation: "slide_from_bottom",
          headerShown: false,
          gestureDirection: "horizontal", // This makes the screen slide from the right by default
          animationDuration: 0.01,
        }}
      />
      <Stack.Screen
        name="screens/LPT/LandingPageT"
        options={{
          animation: "slide_from_bottom",
          headerShown: false,
          gestureDirection: "horizontal", // Ensure the screen transition happens from right
          animationDuration: 0.01,
        }}
      />
      <Stack.Screen
        name="screens/CS/ConfirmSelection"
        options={{
          animation: "slide_from_right",
          headerShown: false,

          animationDuration: 0.01,
        }}
      />
      <Stack.Screen
        name="screens/History/History"
        options={{
          animation: "slide_from_bottom",
          headerShown: false,

          animationDuration: 0.01,
        }}
      />
      <Stack.Screen
        name="screens/ML/MovieList"
        options={{
          animation: "slide_from_right",
          headerShown: false,

          animationDuration: 0.01,
        }}
      />
      <Stack.Screen
        name="screens/TL/MovieList"
        options={{
          animation: "slide_from_right",
          headerShown: false,

          animationDuration: 0.01,
        }}
      />
      <Stack.Screen
        name="screens/SS/SeatSelection"
        options={{
          animation: "slide_from_right",
          headerShown: false,

          animationDuration: 0.01,
        }}
      />
      <Stack.Screen
        name="screens/MP/[mid]"
        options={{
          animation: "slide_from_right",
          headerShown: false,
          animationDuration: 0.01,
        }}
      />
    </Stack>
  );
}
