import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function About({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>

        {/* Title */}
        <Text style={styles.title}>About ShopSphere</Text>

        <Text style={styles.subtitle}>
          Modern Shopping Experience | Fast | Reliable | User Friendly
        </Text>

        {/* Platform Description */}
        <Text style={styles.sectionTitle}>Our Platform</Text>

        <Text style={styles.text}>
          ShopSphere is a modern digital shopping platform designed to provide
          customers with a smooth and reliable mobile shopping experience.
          We focus on performance, simplicity, and accessibility while
          connecting customers to quality products.
        </Text>

        {/* Features */}
        <Text style={styles.sectionTitle}>What You Can Do</Text>

        <View style={styles.listContainer}>
          <Text style={styles.listItem}>• Browse product categories</Text>
          <Text style={styles.listItem}>• Explore latest products</Text>
          <Text style={styles.listItem}>• Enjoy fast and smooth navigation</Text>
          <Text style={styles.listItem}>• Experience clean modern UI</Text>
        </View>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>← Back to Home</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2f5",
    justifyContent: "center",
    padding: 18,
  },

  card: {
    backgroundColor: "white",
    padding: 28,
    borderRadius: 18,
    elevation: 6,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1f2937",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 8,
    color: "#111827",
  },

  text: {
    fontSize: 15,
    lineHeight: 22,
    color: "#4b5563",
  },

  listContainer: {
    marginTop: 6,
  },

  listItem: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 24,
  },

  button: {
    marginTop: 30,
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});