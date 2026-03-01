import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Footer() {
  return (
    <View style={styles.footerWrapper}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Brand */}
        <Text style={styles.brand}>
          <Text style={styles.brandWhite}>ZANBEZI</Text> e-Commerce
        </Text>

        <Text style={styles.description}>
          ZANBEZI marketplace connects you with logistics, vendors, digital
          goods, and lifestyle essentials across South Africa.
        </Text>

        <CollapsibleSection title="Departments" items={departments} />

        <CollapsibleSection title="Shop Categories" items={categories} />

        <CollapsibleSection title="Support" items={supportLinks} />

        <CollapsibleSection title="Company" items={companyLinks} />

        {/* Newsletter */}
        <Text style={styles.sectionTitle}>Subscribe to our newsletter</Text>

        <Text style={styles.subscribeText}>
          Be the first to know about exclusive ZANBEZI offers & deals.
        </Text>

        <TextInput
          placeholder="Enter email"
          placeholderTextColor="#94A3B8"
          style={styles.input}
        />

        <TouchableOpacity style={styles.subscribeButton}>
          <Text style={styles.subscribeButtonText}>Subscribe</Text>
        </TouchableOpacity>

        {/* Social */}
        <View style={styles.socialRow}>
          <FontAwesome name="facebook" size={18} color="white" />
          <FontAwesome name="twitter" size={18} color="white" />
          <FontAwesome name="linkedin" size={18} color="white" />
          <FontAwesome name="instagram" size={18} color="white" />
        </View>

        <Text style={styles.copyright}>
          © {new Date().getFullYear()} ZANBEZI e-Commerce. Powered by Zampost
        </Text>
      </ScrollView>
    </View>
  );
}

/* ===============================
 Collapsible Section Component
================================*/

function CollapsibleSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.sectionBox}>
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={styles.sectionHeader}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <MaterialIcons
          name={open ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={20}
          color="#fff"
        />
      </TouchableOpacity>

      {open &&
        items.map((item, index) => (
          <Text key={index} style={styles.columnText}>
            • {item}
          </Text>
        ))}
    </View>
  );
}

/* ===============================
 Data Lists
================================*/

const departments = [
  "Logistics & Event Services",
  "Gifts & Special Occasions",
  "Collectibles & Antiques",
  "Digital Goods & Services",
  "Pets & Animals",
  "Garden, Patio & BBQ",
  "Electronics",
  "Fashion & Apparel",
];

const categories = [
  "Office Supplies",
  "Sport & Fitness",
  "Automotive",
  "Home Improvement Tools",
  "Groceries & Food",
  "Musical Instruments",
  "Health & Beauty",
  "Books",
];

const supportLinks = ["Help", "Track order", "Shipping", "Returns"];

const companyLinks = ["About", "Blog", "Corporate responsibility", "Press"];

/* ===============================
 Styles
================================*/

const styles = StyleSheet.create({
  footerWrapper: {
    backgroundColor: "#020617",
    padding: 18,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: 40,
  },

  brand: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    textAlign: "center",
    color: "#38BDF8",
    marginBottom: 10,
  },

  brandWhite: {
    color: "white",
  },

  description: {
    color: "#CBD5E1",
    textAlign: "center",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 20,
  },

  sectionBox: {
    marginTop: 15,
    backgroundColor: "#0F172A",
    borderRadius: 18,
    padding: 12,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    color: "#E2E8F0",
    fontSize: 15,
    fontWeight: "600",
  },

  columnText: {
    color: "#CBD5E1",
    fontSize: 13,
    marginTop: 6,
  },

  input: {
    backgroundColor: "#0F172A",
    color: "#fff",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
    fontSize: 13,
  },

  subscribeText: {
    color: "#CBD5E1",
    fontSize: 13,
  },

  subscribeButton: {
    backgroundColor: "#38BDF8",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },

  subscribeButtonText: {
    color: "white",
    fontWeight: "600",
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 25,
  },

  copyright: {
    color: "#64748B",
    fontSize: 11,
    textAlign: "center",
    marginBottom: 10,
  },
});
