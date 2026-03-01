import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Header() {
  return (
    <View style={styles.wrapper}>
      {/* Small Top Strip */}
      <View style={styles.topBar}>
        <View style={styles.leftLinks}>
          <Text style={styles.topText}>About</Text>
          <Text style={styles.topText}>Support</Text>
        </View>

        <View style={styles.rightIcons}>
          <FontAwesome name="whatsapp" size={14} color="#ffffff" />
          <FontAwesome name="facebook" size={14} color="#ffffff" />
          <FontAwesome name="instagram" size={14} color="#ffffff" />
          <MaterialIcons name="person" size={16} color="#ffffff" />
        </View>
      </View>

      {/* Main Compact Header */}
      <View style={styles.mainHeader}>
        {/* Brand Row */}
        <View style={styles.brandRow}>
          <Text style={styles.brand}>
            <Text style={styles.brandAccent}>Buy</Text>Zambezi
          </Text>
        </View>

        {/* Search Row */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <MaterialIcons name="search" size={16} color="#7A7A7A" />
            <TextInput
              placeholder="Search BuyZambezi"
              placeholderTextColor="#7A7A7A"
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#F5F7F8",
  },

  /* Top Small Strip */
  topBar: {
    backgroundColor: "#2C5D6B",
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftLinks: {
    flexDirection: "row",
    gap: 15,
  },

  topText: {
    color: "#ffffff",
    fontSize: 11,
  },

  rightIcons: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },

  /* Main Header */
  mainHeader: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  brandRow: {
    marginBottom: 10,
  },

  brand: {
    fontSize: 22, // smaller for mobile
    fontWeight: "bold",
    color: "#2B2B2B",
  },

  brandAccent: {
    color: "#19A7B8",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },

  input: {
    marginLeft: 6,
    flex: 1,
    fontSize: 13,
    color: "#2B2B2B",
  },

  searchButton: {
    marginLeft: 6,
    backgroundColor: "#19A7B8",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },

  searchText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },
});
