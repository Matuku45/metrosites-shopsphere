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
          <Text style={styles.brandPrimary}>ZANBEZI</Text> e-Commerce
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
          placeholderTextColor="#64748B"
          style={styles.input}
        />

        <TouchableOpacity style={styles.subscribeButton}>
          <Text style={styles.subscribeButtonText}>Subscribe</Text>
        </TouchableOpacity>

        {/* Social Icons */}
        <View style={styles.socialRow}>
          <FontAwesome name="facebook" size={18} color="#1E293B" />
          <FontAwesome name="twitter" size={18} color="#1E293B" />
          <FontAwesome name="linkedin" size={18} color="#1E293B" />
          <FontAwesome name="instagram" size={18} color="#1E293B" />
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
          color="#334155"
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
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: 40,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  brand: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0F172A",
    marginBottom: 10,
  },

  brandPrimary: {
    color: "#38BDF8",
  },

  description: {
    color: "#475569",
    textAlign: "center",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 20,
  },

  sectionBox: {
    marginTop: 15,
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "600",
  },

  columnText: {
    color: "#475569",
    fontSize: 13,
    marginTop: 6,
  },

  input: {
    backgroundColor: "#F1F5F9",
    color: "#0F172A",
    padding: 12,
    borderRadius: 12,
    marginTop: 14,
    fontSize: 13,
  },

  subscribeText: {
    color: "#475569",
    fontSize: 13,
  },

  subscribeButton: {
    backgroundColor: "#38BDF8",
    padding: 13,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 14,
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
    color: "#94A3B8",
    fontSize: 11,
    textAlign: "center",
    marginBottom: 10,
  },
});
