import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const categories = ["All", "Electronics", "Food", "Services", "Fashion"];

export default function CategoryList() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Categories</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.button,
              selectedCategory === category && styles.activeButton,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.text,
                selectedCategory === category && styles.activeText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 18,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 16,
    marginBottom: 10,
  },

  scroll: {
    paddingHorizontal: 16,
  },

  button: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  activeButton: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },

  text: {
    fontSize: 14,
    color: "#333",
  },

  activeText: {
    color: "white",
    fontWeight: "600",
  },
});
