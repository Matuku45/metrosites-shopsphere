import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>ShopSphere Marketplace</Text>

      <Text style={styles.title}>
        Your trusted platform for services, deliveries, and local shopping.
      </Text>

      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <MaterialIcons name="phone" size={18} color="#38BDF8" />
          <Text style={styles.infoText}>+27 12 345 6789</Text>
        </View>

        <View style={styles.infoBox}>
          <MaterialIcons name="email" size={18} color="#38BDF8" />
          <Text style={styles.infoText}>support@shopsphere.com</Text>
        </View>
      </View>

      <View style={styles.socialRow}>
        <FontAwesome name="facebook" size={18} color="#38BDF8" />
        <FontAwesome name="twitter" size={18} color="#38BDF8" />
        <FontAwesome name="instagram" size={18} color="#38BDF8" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "#0F172A",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    elevation: 10,
  },

  brand: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#38BDF8",
    marginBottom: 10,
  },

  title: {
    fontSize: 15,
    color: "#E2E8F0",
    lineHeight: 22,
  },

  infoRow: {
    marginTop: 18,
    gap: 12,
  },

  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  infoText: {
    color: "#CBD5E1",
    fontSize: 14,
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
