import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
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

/* ===========================
   COMPONENT IMPORTS
=========================== */

import Books from "../components/Books";
import ElectronicsPage from "../components/Electronics";
import Food from "../components/Food";
import Music from "../components/Music";
import Pets from "../components/Pets";
import TextBooks from "../components/TextBooks";

import Footer from "../components/Footer";
import Header from "../components/Header";

export default function HomeScreen() {
  const router = useRouter();

  const [cart, setCart] = useState<any[]>([]);

  const [selectedDepartment, setSelectedDepartment] =
    useState("Select Department");

  const [departmentVisible, setDepartmentVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);

  const [activePage, setActivePage] = useState<
    "home" | "electronics" | "books" | "pets" | "textbooks" | "food" | "music"
  >("home");

  const departments = [
    "My Cart",
    "Pets & Animals",
    "Books",
    "Electronics",
    "TextBooks",
    "Food",
    "Musical Instruments",
  ];

  /* ===========================
   STORAGE SYSTEM
  =========================== */

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const data = await AsyncStorage.getItem("CART_ITEMS");
    if (data) setCart(JSON.parse(data));
  };

  const saveCart = async (items: any[]) => {
    await AsyncStorage.setItem("CART_ITEMS", JSON.stringify(items));
  };

  /* ===========================
   CART FUNCTIONS
  =========================== */

  const addToCart = async (product: any) => {
    const existing = cart.find((item) => item.id === product.id);

    let updated;

    if (existing) {
      updated = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      updated = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updated);
    saveCart(updated);
  };

  const increaseQty = async (index: number) => {
    const updated = [...cart];
    updated[index].quantity += 1;

    setCart(updated);
    saveCart(updated);
  };

  const decreaseQty = async (index: number) => {
    const updated = [...cart];

    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
    }

    setCart(updated);
    saveCart(updated);
  };

  const deleteCartItem = async (index: number) => {
    const filtered = cart.filter((_, i) => i !== index);
    setCart(filtered);
    saveCart(filtered);
  };

  /* ===========================
   NAVIGATION LOGIC
  =========================== */

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

      case "TextBooks":
        setActivePage("textbooks");
        break;

      case "Food":
        setActivePage("food");
        break;

      case "Musical Instruments":
        setActivePage("music");
        break;

      case "My Cart":
        setCartVisible(true);
        break;

      default:
        setActivePage("home");
    }
  };

  /* ===========================
   BODY RENDERER
  =========================== */

  const renderBody = () => {
    if (activePage === "electronics")
      return <ElectronicsPage onAddToCart={addToCart} />;

    if (activePage === "books") return <Books />;

    if (activePage === "pets") return <Pets />;

    if (activePage === "textbooks") return <TextBooks />;

    if (activePage === "food") return <Food />;

    if (activePage === "music") return <Music />;

    return <Footer />;
  };

  /* ===========================
   HEADER
  =========================== */

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
    </View>
  );

  /* ===========================
   UI
  =========================== */

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader()}
        data={[{ key: "body" }]}
        renderItem={() => renderBody()}
      />

      {/* Department Modal */}
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

                  {/* QUANTITY CONTROLS */}
                  <View style={styles.qtyRow}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => decreaseQty(index)}
                    >
                      <MaterialIcons name="remove" size={18} />
                    </TouchableOpacity>

                    <Text style={styles.qtyText}>{item.quantity}</Text>

                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => increaseQty(index)}
                    >
                      <MaterialIcons name="add" size={18} />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity onPress={() => deleteCartItem(index)}>
                  <MaterialIcons name="delete" size={22} color="#d32f2f" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* CHECKOUT BUTTON */}
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => {
              setCartVisible(false);
              router.push("/Checkout");
            }}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* ===========================
   STYLES
=========================== */

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

  badgeText: { color: "white", fontSize: 12 },

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
    elevation: 10,
  },

  cartTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  cartRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
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

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  qtyBtn: {
    width: 26,
    height: 26,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },

  qtyText: {
    marginHorizontal: 10,
    fontWeight: "600",
  },

  checkoutButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },

  checkoutText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
});
