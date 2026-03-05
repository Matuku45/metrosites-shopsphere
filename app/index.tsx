import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { useProducts } from "../hooks/useProducts";

export default function HomeScreen() {
  const { products } = useProducts();

  const [cart, setCart] = useState<any[]>([]);
  const [selectedDepartment, setSelectedDepartment] =
    useState("Select Department");

  const [departmentVisible, setDepartmentVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);

  const [activePage, setActivePage] = useState<
    "home" | "electronics" | "books" | "pets"
  >("home");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Electronics", "Food", "Services", "Fashion"];

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
  ];

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await AsyncStorage.getItem("CART_ITEMS");
      if (data) setCart(JSON.parse(data));
    } catch (error) {
      console.log(error);
    }
  };

  const saveCart = async (items: any[]) => {
    try {
      await AsyncStorage.setItem("CART_ITEMS", JSON.stringify(items));
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (product: any) => {
    const newCart = [...cart, product];
    setCart(newCart);
    await saveCart(newCart);
  };

  const deleteCartItem = async (index: number) => {
    const filtered = cart.filter((_, i) => i !== index);
    setCart(filtered);
    await saveCart(filtered);
  };

  const handleDepartmentSelect = (value: string) => {
    setSelectedDepartment(value);
    setDepartmentVisible(false);

    switch (value) {
      case "Electronics":
        setActivePage("electronics");
        break;

      case "Books":
        setActivePage("books");
        break;

      case "Pets & Animals":
        setActivePage("pets");
        break;

      case "My Cart":
        setCartVisible(true);
        break;

      default:
        setActivePage("home");
    }
  };

  /* HEADER */

  const renderHeader = () => (
    <View style={styles.headerBlock}>
      <Header />

      <View style={styles.topControls}>
        <View style={{ flex: 1 }}>
          <Text style={styles.dropdownLabel}>Browse Departments</Text>

          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setDepartmentVisible(true)}
          >
            <Text style={styles.selectText}>{selectedDepartment}</Text>
            <MaterialIcons name="keyboard-arrow-down" size={22} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.cartIconButton}
          onPress={() => setCartVisible(true)}
        >
          <MaterialIcons name="shopping-cart" size={24} color="white" />

          {cart.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* CATEGORY SCROLL */}

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryLabel}>Categories</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryActiveButton,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryActiveText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[]}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={<Footer />}
        renderItem={null}
        keyExtractor={(item: any) =>
          item.id?.toString() ?? Math.random().toString()
        }
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {/* DEPARTMENT MODAL */}

      <Modal visible={departmentVisible} transparent>
        <Pressable
          style={styles.overlay}
          onPress={() => setDepartmentVisible(false)}
        />

        <View style={styles.bottomSheet}>
          <ScrollView>
            {departments.map((dept) => (
              <TouchableOpacity
                key={dept}
                style={styles.departmentItem}
                onPress={() => handleDepartmentSelect(dept)}
              >
                <Text style={styles.departmentText}>{dept}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>

      {/* CART SIDEBAR */}

      <Modal visible={cartVisible} transparent>
        <Pressable
          style={styles.overlay}
          onPress={() => setCartVisible(false)}
        />

        <View style={styles.cartSidebar}>
          <Text style={styles.cartTitle}>My Cart ({cart.length})</Text>

          <ScrollView>
            {cart.map((item, index) => (
              <View key={index} style={styles.cartRow}>
                <Image source={item.image} style={styles.cartImage} />

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.cartPrice}>
                    R {item.price?.toFixed(2)}
                  </Text>
                </View>

                <TouchableOpacity onPress={() => deleteCartItem(index)}>
                  <MaterialIcons name="delete" size={22} color="#d32f2f" />
                </TouchableOpacity>
              </View>
            ))}
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

/* STYLES */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fb" },
  headerBlock: { width: "100%" },
  topControls: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 18,
  },
  dropdownLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  selectButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 14,
    borderRadius: 18,
    elevation: 3,
  },
  selectText: { fontSize: 14 },

  cartIconButton: {
    marginLeft: 12,
    backgroundColor: "#2563eb",
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "#d32f2f",
    borderRadius: 10,
    paddingHorizontal: 6,
  },

  badgeText: {
    color: "white",
    fontSize: 12,
  },

  categoryContainer: {
    width: "100%",
    marginBottom: 18,
  },

  categoryLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 16,
    marginBottom: 10,
  },

  categoryScroll: {
    paddingHorizontal: 16,
  },

  categoryButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  categoryActiveButton: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },

  categoryText: {
    fontSize: 14,
    color: "#333",
  },

  categoryActiveText: {
    color: "white",
    fontWeight: "600",
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

  departmentItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  departmentText: { fontSize: 15 },

  cartSidebar: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "78%",
    backgroundColor: "white",
    padding: 20,
  },

  cartTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  cartRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  cartImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },

  cartPrice: {
    color: "#d32f2f",
    fontWeight: "700",
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
