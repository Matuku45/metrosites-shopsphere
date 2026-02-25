import { StyleSheet, Text, View } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.title}>MetroSites ShopSphere</Text>

      <Text style={styles.subtitle}>
        Quality services delivered fast and reliably.
      </Text>

      <View style={styles.divider} />

      <View style={styles.linksRow}>
        <Text style={styles.link}>About</Text>
        <Text style={styles.link}>Services</Text>
        <Text style={styles.link}>Support</Text>
        <Text style={styles.link}>Contact</Text>
      </View>

      <Text style={styles.copyright}>
        © {new Date().getFullYear()} MetroSites. All rights reserved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "#0F172A",
    padding: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },

  title: {
    color: "#38BDF8",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    color: "#CBD5E1",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
  },

  divider: {
    height: 1,
    backgroundColor: "#334155",
    marginVertical: 15,
  },

  linksRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },

  link: {
    color: "#E2E8F0",
    fontSize: 14,
    fontWeight: "500",
  },

  copyright: {
    color: "#64748B",
    fontSize: 12,
    textAlign: "center",
  },
});
