import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Footer from "./Footer";

/* =====================================================
   PRODUCT INTERFACE
===================================================== */

interface Product {
  id: number;
  name: string;
  price: number;
  stock: boolean;
  image: any;
  quantity?: number;
}

interface Props {
  onAddToCart?: (product: Product) => void;
}

/* =====================================================
   MUSIC IMAGE DATABASE
===================================================== */

const MUSIC_IMAGES: Record<string, any> = {
  music1: require("../assets/ClickablePictures/Music/Music1.jpg"),
  music3: require("../assets/ClickablePictures/Music/Music3.jpg"),
};

/* =====================================================
   MUSIC DATASET
===================================================== */

const MUSIC_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Traditional African Music Instrumental",
    price: 180.0,
    stock: true,
    image: MUSIC_IMAGES.music1,
  },
  {
    id: 2,
    name: "Modern Guitar Relaxing Music",
    price: 220.0,
    stock: true,
    image: MUSIC_IMAGES.music3,
  },
];

/* =====================================================
   PRODUCT CARD
===================================================== */

function ProductRow({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart?: (product: Product & { quantity?: number }) => void;
}) {
  const [quantity, setQuantity] = useState(1);

  const totalPrice = product.price * quantity;

  return (
    <View style={styles.card}>
      <Image source={product.image} style={styles.image} />

      <View style={styles.infoSection}>
        <Text style={styles.title} numberOfLines={2}>
          {product.name}
        </Text>

        <Text style={styles.price}>R {totalPrice.toFixed(2)}</Text>

        <Text style={styles.stock}>
          {product.stock ? "In Stock" : "Out of Stock"}
        </Text>

        {/* Quantity Control */}
        <View style={styles.stepperRow}>
          <TouchableOpacity
            style={styles.stepButton}
            onPress={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <Text style={styles.stepText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{quantity}</Text>

          <TouchableOpacity
            style={styles.stepButton}
            onPress={() => setQuantity((q) => q + 1)}
          >
            <Text style={styles.stepText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Add Cart */}
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() =>
            onAddToCart?.({
              ...product,
              quantity,
            })
          }
        >
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* =====================================================
   MUSIC PAGE (PRODUCTION SAFE CART ENGINE)
===================================================== */

export default function MusicPage({ onAddToCart }: Props) {
  const router = useRouter();

  const [cartCache, setCartCache] = useState<any[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  /* ================= STORAGE ================= */

  const loadCart = async () => {
    try {
      const stored = await AsyncStorage.getItem("CART_ITEMS");

      if (stored) {
        setCartCache(JSON.parse(stored));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveCart = async (items: any[]) => {
    await AsyncStorage.setItem("CART_ITEMS", JSON.stringify(items));
  };

  /* ================= CART ENGINE ================= */

  const handleAddMusic = async (product: Product & { quantity?: number }) => {
    try {
      const stored = await AsyncStorage.getItem("CART_ITEMS");

      let cart: any[] = stored ? JSON.parse(stored) : [];

      const index = cart.findIndex((item) => item.id === product.id);

      /* =============================
       CART UPDATE ENGINE
    ============================= */

      if (index !== -1) {
        cart[index].quantity =
          (cart[index].quantity || 0) + (product.quantity || 1);
      } else {
        cart.push({
          ...product,
          quantity: product.quantity || 1,
        });
      }

      /* =============================
       SAVE CART
    ============================= */

      await saveCart(cart);
      setCartCache([...cart]);

      /* =============================
       GLOBAL BADGE REFRESH ENGINE
    ============================= */

      if ((global as any).cartRefresh) {
        await (global as any).cartRefresh();
      }

      /* =============================
       CALLBACK SUPPORT
    ============================= */

      onAddToCart?.(product);

      /* =============================
       SUCCESS POPUP
    ============================= */

      Alert.alert(
        "✅ Added to Cart",
        `${product.name} successfully added to your cart 🛒`,
      );
    } catch (error) {
      console.log("MUSIC CART ERROR", error);

      Alert.alert(
        "❌ Cart Error",
        "Something went wrong while adding item to cart.",
      );
    }
  };

  /* ================= UI ================= */

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <MaterialIcons name="home" size={28} color="#2563eb" />
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>🎵 Music Collection</Text>

      <FlatList
        data={MUSIC_PRODUCTS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductRow product={item} onAddToCart={handleAddMusic} />
        )}
        ListFooterComponent={<Footer />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </SafeAreaView>
  );
}

/* =====================================================
   STYLE
===================================================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 14,
  },

  topBar: {
    flexDirection: "row",
    paddingVertical: 12,
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 18,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 18,
    padding: 12,
    marginBottom: 16,
    elevation: 3,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 14,
    marginRight: 12,
  },

  infoSection: { flex: 1 },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#d32f2f",
    marginTop: 6,
  },

  stock: {
    marginTop: 4,
    fontSize: 13,
    color: "#2ed1ef",
    fontWeight: "600",
  },

  stepperRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  stepButton: {
    width: 34,
    height: 34,
    backgroundColor: "#2ed1ef",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  stepText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  quantity: {
    marginHorizontal: 14,
    fontSize: 16,
    fontWeight: "600",
  },

  cartButton: {
    marginTop: 14,
    backgroundColor: "#2ed1ef",
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: "center",
  },

  cartText: {
    color: "white",
    fontWeight: "700",
  },
});
