import { StyleSheet, Text, View } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.brand}>MetroSites ShopSphere</Text>

      <Text style={styles.description}>
        Your trusted marketplace for services, deliveries, and quality local
        products. Shop smart. Live better.
      </Text>

      <View style={styles.divider} />

      <View style={styles.linksRow}>
        <Text style={styles.link}>About Us</Text>
        <Text style={styles.link}>Support</Text>
        <Text style={styles.link}>Privacy</Text>
        <Text style={styles.link}>Contact</Text>
      </View>

      <Text style={styles.copyright}>
        © {new Date().getFullYear()} MetroSites Technologies
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "#020617",
    padding: 30,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: 30,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 12,
  },

  brand: {
    color: "#38BDF8",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },

  description: {
    color: "#CBD5E1",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 10,
  },

  divider: {
    height: 1,
    backgroundColor: "#1E293B",
    marginVertical: 20,
  },

  linksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 15,
    marginBottom: 25,
  },

  link: {
    color: "#E2E8F0",
    fontSize: 14,
    fontWeight: "600",
  },

  copyright: {
    color: "#64748B",
    fontSize: 12,
    textAlign: "center",
  },
});
