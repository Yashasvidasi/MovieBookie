import React, { PureComponent, memo } from "react";
import {
  Animated,
  Pressable,
  Image,
  View,
  Text,
  GestureResponderEvent,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Import for star icon
import { router } from "expo-router";

// Type for TruncatedText Props
interface TruncatedTextProps {
  title: string;
}

// TruncatedText Component
const TruncatedText = ({ title }: TruncatedTextProps) => {
  const truncate = (str: string, maxLength: number) => {
    return str.length > maxLength
      ? str.substring(0, maxLength - 3) + "..."
      : str;
  };

  return <Text style={styles.titleText}>{truncate(title, 20)}</Text>;
};

// Type for TCard Props
interface TCardProps {
  poster?: any; // poster URL, optional
  title?: any; // title of the movie, optional
  rating?: any; // rating for the movie, optional
  id?: any; // name of the movie, optional
}

// TCard Component
class TCard extends PureComponent<TCardProps> {
  scale: Animated.Value;

  constructor(props: TCardProps) {
    super(props);
    this.scale = new Animated.Value(1);
  }

  // Handle press in (scale effect)
  handlePressIn = () => {
    Animated.timing(this.scale, {
      toValue: 1.04,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  // Handle press out (scale effect)
  handlePressOut = () => {
    Animated.timing(this.scale, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  // Placeholder handler for onPress
  handler = async (event: GestureResponderEvent) => {
    router.push({
      pathname: "../screens/LPT/LandingPageT",
      params: { title: this.props.title },
    });
  };

  rating = Math.random() * 5;

  getStarIcons = () => {
    let fullStars = Math.floor(this.rating); // Full stars (rounded down)
    let halfStars = this.rating % 1 >= 0.5 ? 1 : 0; // Half star if the decimal part is >= 0.5
    let emptyStars = 5 - fullStars - halfStars; // Remaining empty stars

    // Create the star icons based on the rating
    let stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesome key={`full-${i}`} name="star" size={11} color="gold" />
      );
    }
    if (halfStars > 0) {
      stars.push(
        <FontAwesome key="half" name="star-half" size={11} color="gold" />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesome key={`empty-${i}`} name="star-o" size={11} color="gold" />
      );
    }

    return stars;
  };

  render() {
    return (
      <Animated.View style={{ transform: [{ scale: this.scale }] }}>
        <Pressable
          style={styles.cardContainer}
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}
          onPress={this.handler}
        >
          {/* Movie Poster */}
          <View style={styles.imageContainer}>
            {this.props.poster ? (
              <Image style={styles.posterImage} source={this.props.poster} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderText}>Image Unavailable</Text>
              </View>
            )}
          </View>

          {/* Movie Title */}
          <TruncatedText title={this.props.title || "No Title"} />

          {/* Movie Rating */}
          <View style={styles.ratingContainer}>
            {this.getStarIcons()}
            <Text style={styles.ratingText}>
              ({this.props.rating || "N/A"})
            </Text>
          </View>
        </Pressable>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 8,
    margin: 8,
    alignItems: "center",
  },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    borderRadius: 12,
    overflow: "hidden",
  },
  posterImage: {
    width: 120, // Adjust width here
    height: 190, // Adjust height here
    borderRadius: 12,
  },
  imagePlaceholder: {
    width: 80, // Adjust width here
    height: 120, // Adjust height here
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  placeholderText: {
    color: "#fff",
    textAlign: "center",
  },
  titleText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  ratingText: {
    color: "#ccc",
    marginLeft: 4,
    fontSize: 12,
  },
});

export default memo(TCard);
