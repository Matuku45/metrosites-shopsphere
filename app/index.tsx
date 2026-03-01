import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CategoryList from "../components/CategoryList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function HomeScreen() {
  const { products } = useProducts();
  const router = useRouter();

  const [selectedDepartment, setSelectedDepartment] =
    useState("Select Department");
  const [departmentVisible, setDepartmentVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);

  const departments = [
    "My Cart",
    "Logistics & Event Services",
    "Gifts & Special Occasions",
    "Collectibles & Antiques",
    "Digital Goods & Services",
    "Pets & Animals",
    "Garden, Patio & BBQ",
    "Industrial, Scientific & B2B",
    "Office Supplies & Stationery",
    "Sport, Fitness & Outdoors",
    "Automotive & Motorcycle",
    "DIY, Home Improvement & Tools",
    "Groceries, Food & Beverages",
    "Musical Instruments",
    "Home & Kitchen",
    "Health & Beauty",
    "Arts, Crafts & Sewing",
    "Fashion & Apparel",
    "Books",
    "Electronics",
    "eeZee Instant Noodles Chicken Collection",
  ];

  const handleDepartmentSelect = (value: string) => {
    setSelectedDepartment(value);
    setDepartmentVisible(false);

    if (value === "My Cart") {
      setCartVisible(true);
    } else {
      router.push(`/category/${value}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <ProductCard product={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <>
            {/* Header now scrolls */}
            <Header />

            {/* Modern Select Input */}
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Browse Departments</Text>

              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setDepartmentVisible(true)}
                activeOpacity={0.8}
              >
                <Text style={styles.selectText}>{selectedDepartment}</Text>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={22}
                  color="#555"
                />
              </TouchableOpacity>
            </View>

            <CategoryList />
          </>
        }
        ListFooterComponent={<Footer />}
      />

      {/* Department Bottom Sheet */}
      <Modal visible={departmentVisible} transparent animationType="slide">
        <Pressable
          style={styles.overlay}
          onPress={() => setDepartmentVisible(false)}
        />

        <View style={styles.bottomSheet}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {departments.map((dept, index) => (
              <TouchableOpacity
                key={index}
                style={styles.departmentItem}
                onPress={() => handleDepartmentSelect(dept)}
              >
                <Text style={styles.departmentText}>{dept}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>

      {/* Cart Sidebar */}
      <Modal visible={cartVisible} animationType="slide" transparent>
        <Pressable
          style={styles.overlay}
          onPress={() => setCartVisible(false)}
        />

        <View style={styles.cartSidebar}>
          <Text style={styles.cartTitle}>My Cart</Text>

          <ScrollView>
            <Text style={styles.cartItem}>
              🛒 eeZee Instant Noodles Chicken Collection
            </Text>
            <Text style={styles.cartItem}>
              Your cart items will appear here.
            </Text>
          </ScrollView>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setCartVisible(false)}
          >
            <Text style={{ color: "white" }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  listContainer: {
    paddingBottom: 60,
  },

  dropdownContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 15,
  },

  dropdownLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#444",
  },

  selectButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  selectText: {
    fontSize: 14,
    color: "#333",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "60%",
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },

  departmentItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  departmentText: {
    fontSize: 15,
    color: "#333",
  },

  cartSidebar: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "75%",
    backgroundColor: "white",
    padding: 20,
    elevation: 10,
  },

  cartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  cartItem: {
    marginBottom: 12,
    fontSize: 14,
  },

  closeButton: {
    marginTop: 20,
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});
