import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
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
import CategoryImageList from "../components/ProductCard";

/* ===========================
   HOME SCREEN
=========================== */

export default function HomeScreen() {
  const router = useRouter();

  /* ⭐ AI ANIMATION ENGINE */
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

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

  useEffect(() => {
    (global as any).cartRefresh = async () => {
      const data = await AsyncStorage.getItem("CART_ITEMS");
      if (data) setCart(JSON.parse(data));
    };

    return () => {
      (global as any).cartRefresh = null;
    };
  }, []);

  const saveCart = async (items: any[]) => {
    await AsyncStorage.setItem("CART_ITEMS", JSON.stringify(items));
  };

  const addToCart = async (product: any) => {
    const stored = await AsyncStorage.getItem("CART_ITEMS");

    let cartData: any[] = stored ? JSON.parse(stored) : [];

    const index = cartData.findIndex((p) => p.id === product.id);

    if (index !== -1) {
      cartData[index].quantity += product.quantity || 1;
    } else {
      cartData.push({
        ...product,
        quantity: product.quantity || 1,
      });
    }

    setCart([...cartData]);
    await saveCart(cartData);
  };

  const increaseQty = async (index: number) => {
    const updated = [...cart];
    updated[index].quantity += 1;

    setCart(updated);
    await saveCart(updated);
  };

  const decreaseQty = async (index: number) => {
    const updated = [...cart];

    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
    }

    setCart(updated);
    await saveCart(updated);
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

  const renderBody = () => {
    if (activePage === "electronics")
      return <ElectronicsPage onAddToCart={addToCart} />;

    if (activePage === "books") return <Books onAddToCart={addToCart} />;

    if (activePage === "pets") return <Pets />;

    if (activePage === "textbooks") return <TextBooks />;

    if (activePage === "food") return <Food />;

    if (activePage === "music") return <Music />;

    return (
      <ScrollView>
        <CategoryImageList onSelect={handleDepartmentSelect} />
        <Footer />
      </ScrollView>
    );
  };

  /* ===========================
     HEADER UI (AI ICON PERFECT)
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

        {/* ⭐ ROBOT AI BUTTON */}
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "🤖 Smart Shopping Assistant",
              "I am your AI robot assistant. I can suggest products, help you search, and improve your shopping experience!",
            );

            router.push("/AI_SUGGESTION");
          }}
        >
          <Animated.View
            style={[
              styles.aiButton,
              { transform: [{ translateY: bounceAnim }] },
            ]}
          >
            <MaterialIcons name="smart-toy" size={28} color="white" />
          </Animated.View>
        </TouchableOpacity>

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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader()}
        data={[{ key: "body" }]}
        renderItem={() => renderBody()}
      />

      {/* Department Modal */}
      <Modal visible={departmentVisible} transparent animationType="fade">
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
      <Modal visible={cartVisible} transparent animationType="slide">
        <Pressable
          style={styles.overlay}
          onPress={() => setCartVisible(false)}
        />

        <View style={styles.cartSidebar}>
          <Text style={styles.cartTitle}>My Cart ({cart.length})</Text>

          <ScrollView>
            {cart.map((item, index) => (
              <View key={index} style={styles.cartRow}>
                <Image
                  source={item.image || require("../assets/images/icon.png")}
                  style={styles.cartImage}
                />

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text numberOfLines={1}>{item.name}</Text>

                  <Text style={styles.cartPrice}>
                    R {(item.price * item.quantity).toFixed(2)}
                  </Text>

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

  aiButton: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#10b981",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,

    shadowColor: "#10b981",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
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
