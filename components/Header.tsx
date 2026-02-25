import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>ShopSphere</Text>

      <Text style={styles.title}>
        Discover, Shop & Access Amazing Local Services
      </Text>

      <Text style={styles.subtitle}>
        Fast delivery • Trusted vendors • Quality products
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "#0F172A",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },

  brand: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#38BDF8",
    letterSpacing: 1,
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    color: "#E2E8F0",
    fontWeight: "600",
    lineHeight: 24,
  },

  subtitle: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 8,
  },
});
