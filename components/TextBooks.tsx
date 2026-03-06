import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
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

/* =====================================================
   IMAGE DATABASE
===================================================== */

const TEXTBOOK_IMAGES: Record<string, any> = {
  biology: require("../assets/ClickablePictures/textbooks/biology.jpg"),
  creativeTech: require("../assets/ClickablePictures/textbooks/CreativeAndTechnology.jpg"),
  democratic: require("../assets/ClickablePictures/textbooks/DemocraticRepublic.jpg"),
  footballManager: require("../assets/ClickablePictures/textbooks/FootBallerManagers.jpg"),
  gradeEnglish: require("../assets/ClickablePictures/textbooks/grade6-english.jpg"),
  shadowConflict: require("../assets/ClickablePictures/textbooks/ShadowOfConflict.jpg"),
  zambiaEconomy: require("../assets/ClickablePictures/textbooks/ZambiaEkonomi.jpg"),
};

/* =====================================================
   TEXTBOOK DATASET
===================================================== */

const TEXTBOOKS: Product[] = [
  {
    id: 1,
    name: "Grade 6 English Textbook",
    price: 150,
    stock: true,
    image: TEXTBOOK_IMAGES.gradeEnglish,
  },
  {
    id: 2,
    name: "Biology Foundation Guide",
    price: 180,
    stock: true,
    image: TEXTBOOK_IMAGES.biology,
  },
  {
    id: 3,
    name: "Creative Technology Studies",
    price: 210,
    stock: true,
    image: TEXTBOOK_IMAGES.creativeTech,
  },
  {
    id: 4,
    name: "Democratic Republic History",
    price: 160,
    stock: true,
    image: TEXTBOOK_IMAGES.democratic,
  },
  {
    id: 5,
    name: "Football Management Basics",
    price: 200,
    stock: true,
    image: TEXTBOOK_IMAGES.footballManager,
  },
  {
    id: 6,
    name: "Shadow of Conflict Studies",
    price: 190,
    stock: true,
    image: TEXTBOOK_IMAGES.shadowConflict,
  },
  {
    id: 7,
    name: "Zambia Economy Guide",
    price: 175,
    stock: true,
    image: TEXTBOOK_IMAGES.zambiaEconomy,
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

      <View style={{ flex: 1 }}>
        <Text style={styles.title} numberOfLines={2}>
          {product.name}
        </Text>

        <Text style={styles.price}>R {totalPrice.toFixed(2)}</Text>

        <Text style={styles.stock}>
          {product.stock ? "In Stock" : "Out of Stock"}
        </Text>

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

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() =>
            onAddToCart?.({
              ...product,
              quantity,
            })
          }
        >
          <Text style={styles.cartText}>
            Add to Cart — R {totalPrice.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* =====================================================
   TEXTBOOK PAGE
===================================================== */

export default function TextBooksPage() {
  const router = useRouter();
  const [cartCache, setCartCache] = useState<any[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  /* ================= STORAGE ================= */

  const loadCart = async () => {
    try {
      const data = await AsyncStorage.getItem("CART_ITEMS");
      if (data) setCartCache(JSON.parse(data));
    } catch {}
  };

  const saveCart = async (items: any[]) => {
    await AsyncStorage.setItem("CART_ITEMS", JSON.stringify(items));
  };

  /* ================= CART ENGINE ================= */

  const handleAddTextbook = async (
    product: Product & { quantity?: number },
  ) => {
    try {
      const stored = await AsyncStorage.getItem("CART_ITEMS");

      let cart: any[] = stored ? JSON.parse(stored) : [];

      const index = cart.findIndex((item) => item.id === product.id);

      if (index !== -1) {
        cart[index].quantity =
          (cart[index].quantity || 1) + (product.quantity || 1);
      } else {
        cart.push({
          ...product,
          quantity: product.quantity || 1,
        });
      }

      await AsyncStorage.setItem("CART_ITEMS", JSON.stringify(cart));

      setCartCache(cart);

      // 🔥 Notify parent system if exists
      if ((global as any).cartRefresh) {
        (global as any).cartRefresh();
      }
    } catch (error) {
      console.log("Textbook Cart Error", error);
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

      <Text style={styles.header}>📖 Educational Textbooks Collection</Text>

      <FlatList
        data={TEXTBOOKS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductRow product={item} onAddToCart={handleAddTextbook} />
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
