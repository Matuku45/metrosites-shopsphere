import { Picker } from "@react-native-picker/picker";
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

  const [selectedDepartment, setSelectedDepartment] = useState("");
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

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);

    if (value === "My Cart") {
      setCartVisible(true);
    } else {
      router.push(`/category/${value}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      {/* Modern Department Dropdown */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Browse Departments</Text>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedDepartment}
            onValueChange={handleDepartmentChange}
          >
            <Picker.Item label="Select Department..." value="" />
            {departments.map((dept, index) => (
              <Picker.Item key={index} label={dept} value={dept} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Product Listing */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={<CategoryList />}
        ListFooterComponent={<Footer />}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Slide-in Cart Sidebar */}
      <Modal visible={cartVisible} animationType="slide" transparent={true}>
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

  dropdownContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  dropdownLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },

  pickerWrapper: {
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 60,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
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
