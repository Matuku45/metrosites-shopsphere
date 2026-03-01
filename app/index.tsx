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
            {/* Header scrolls naturally */}
            <Header />

            {/* Top Controls */}
            <View style={styles.topControls}>
              <View style={{ flex: 1 }}>
                <Text style={styles.dropdownLabel}>Browse Departments</Text>

                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={() => setDepartmentVisible(true)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.selectText}>{selectedDepartment}</Text>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={22}
                    color="#555"
                  />
                </TouchableOpacity>
              </View>

              {/* Cart Icon */}
              <TouchableOpacity
                style={styles.cartIconButton}
                onPress={() => setCartVisible(true)}
                activeOpacity={0.85}
              >
                <MaterialIcons name="shopping-cart" size={24} color="white" />
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
          <View style={styles.sheetHandle} />
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

          <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text style={styles.closeText}>Close</Text>
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
    paddingBottom: 80,
  },

  topControls: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 18,
  },

  dropdownLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#444",
  },

  selectButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  selectText: {
    fontSize: 14,
    color: "#333",
  },

  cartIconButton: {
    marginLeft: 12,
    backgroundColor: "#2563eb",
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "65%",
    backgroundColor: "white",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
  },

  sheetHandle: {
    width: 50,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 15,
  },

  departmentItem: {
    paddingVertical: 15,
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
    width: "78%",
    backgroundColor: "white",
    padding: 20,
    elevation: 10,
  },

  cartTitle: {
    fontSize: 22,
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
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  closeText: {
    color: "white",
    fontWeight: "600",
  },
});
