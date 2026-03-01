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
    <View>
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <Text style={styles.topLink}>About us</Text>
          <Text style={styles.topLink}>Customer support</Text>
        </View>

        <View style={styles.topRight}>
          <FontAwesome name="user" size={14} color="#ffffff" />
          <Text style={styles.signIn}> Sign In</Text>
        </View>
      </View>

      {/* Main Header Section */}
      <View style={styles.mainHeader}>
        {/* Logo */}
        <Text style={styles.brand}>
          <Text style={styles.brandAccent}>Buy</Text>Zambezi
        </Text>

        {/* Search Section */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <MaterialIcons name="search" size={18} color="#7A7A7A" />
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
  /* Top Bar */
  topBar: {
    backgroundColor: "#2C5D6B",
    paddingVertical: 8,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  topLeft: {
    flexDirection: "row",
    gap: 20,
  },

  topLink: {
    color: "#ffffff",
    fontSize: 13,
  },

  topRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  signIn: {
    color: "#ffffff",
    fontSize: 13,
  },

  /* Main Header */
  mainHeader: {
    backgroundColor: "#F5F7F8",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },

  brand: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2B2B2B",
    marginBottom: 15,
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
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },

  input: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    color: "#2B2B2B",
  },

  searchButton: {
    marginLeft: 10,
    backgroundColor: "#19A7B8",
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  searchText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
