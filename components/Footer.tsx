import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Footer() {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.brand}>MetroSites ShopSphere</Text>

      <Text style={styles.description}>
        ShopSphere is your trusted marketplace connecting you with logistics
        services, local vendors, digital products, and lifestyle essentials.
        Discover quality, convenience, and secure shopping.
      </Text>

      {/* Departments Preview */}
      <SectionTitle title="All Departments" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tagRow}>
          {departments.map((item, index) => (
            <Tag key={index} label={item} />
          ))}
        </View>
      </ScrollView>

      {/* Shop Categories */}
      <SectionTitle title="Shop by Category" />
      <View style={styles.gridBox}>
        {categories.map((item, index) => (
          <Text key={index} style={styles.gridText}>
            • {item}
          </Text>
        ))}
      </View>

      {/* Support + Company Links */}
      <View style={styles.linkSection}>
        <FooterColumn title="Shop" items={shopLinks} />
        <FooterColumn title="Support" items={supportLinks} />
        <FooterColumn title="Company" items={companyLinks} />
      </View>

      {/* Contact */}
      <View style={styles.contactRow}>
        <ContactItem icon="call" text="+27 12 345 6789" />
        <ContactItem icon="mail" text="info@shopsphere.com" />
      </View>

      {/* Subscription */}
      <SectionTitle title="Subscribe to our newsletter" />

      <Text style={styles.subscribeText}>
        Be the first to know about exclusive offers & deals.
      </Text>

      <TextInput
        placeholder="Enter email"
        placeholderTextColor="#64748B"
        style={styles.input}
      />

      <TouchableOpacity style={styles.subscribeButton}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>Subscribe</Text>
      </TouchableOpacity>

      {/* Social Icons */}
      <View style={styles.socialRow}>
        <FontAwesome name="facebook" size={18} color="#E2E8F0" />
        <FontAwesome name="twitter" size={18} color="#E2E8F0" />
        <FontAwesome name="linkedin" size={18} color="#E2E8F0" />
        <FontAwesome name="instagram" size={18} color="#E2E8F0" />
      </View>

      <Text style={styles.copyright}>
        © {new Date().getFullYear()} by Zambezi e-Commerce. Powered and secured
        by Zampost
      </Text>
    </View>
  );
}

/* ===============================
   Helper Components
================================*/

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

function Tag({ label }: { label: string }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  );
}

import type { ComponentProps } from "react";

function ContactItem({
  icon,
  text,
}: {
  icon: ComponentProps<typeof MaterialIcons>["name"];
  text: string;
}) {
  return (
    <View style={styles.contactItem}>
      <MaterialIcons name={icon} size={16} color="#38BDF8" />
      <Text style={styles.contactText}>{text}</Text>
    </View>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.columnTitle}>{title}</Text>
      {items.map((item, index) => (
        <Text key={index} style={styles.columnText}>
          {item}
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
  "Digital Goods",
  "Pets & Animals",
  "Electronics",
  "Home & Kitchen",
  "Books",
  "Fashion",
];

const categories = [
  "Pet Health & Medicine",
  "Office Stationery",
  "Software Licenses",
  "Jewellery",
  "Skincare",
  "Art Supplies",
  "Power Tools",
  "Gaming Consoles",
  "Fresh Produce",
  "Online Courses",
];

const shopLinks = ["Logistics", "Gifts", "Antiques", "Electronics", "Fashion"];

const supportLinks = ["Help", "Track Order", "Shipping", "Returns"];

const companyLinks = ["About", "Blog", "Responsibility", "Press"];

/* ===============================
   Styles
================================*/

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "#020617",
    padding: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 30,
    elevation: 12,
  },

  brand: {
    color: "#38BDF8",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },

  description: {
    color: "#CBD5E1",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 25,
  },

  sectionTitle: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },

  tagRow: {
    flexDirection: "row",
    gap: 10,
  },

  tag: {
    backgroundColor: "#0F172A",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  tagText: {
    color: "#CBD5E1",
    fontSize: 12,
  },

  gridBox: {
    backgroundColor: "#0F172A",
    padding: 18,
    borderRadius: 20,
    gap: 6,
  },

  gridText: {
    color: "#E2E8F0",
    fontSize: 13,
  },

  linkSection: {
    flexDirection: "row",
    marginTop: 25,
    gap: 15,
  },

  columnTitle: {
    color: "#38BDF8",
    fontWeight: "600",
    marginBottom: 8,
  },

  columnText: {
    color: "#CBD5E1",
    fontSize: 13,
    marginBottom: 4,
  },

  contactRow: {
    marginTop: 20,
    gap: 12,
  },

  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  contactText: {
    color: "#E2E8F0",
  },

  input: {
    backgroundColor: "#0F172A",
    color: "#fff",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
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

  socialRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 25,
  },

  copyright: {
    color: "#64748B",
    fontSize: 12,
    textAlign: "center",
  },
});
