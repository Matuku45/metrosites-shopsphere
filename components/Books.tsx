import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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
  View
} from "react-native";

import Footer from "./Footer";

/* =====================================================
   Product Interface
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
   BOOK IMAGE DATABASE
===================================================== */

const BOOK_IMAGES: Record<string, any> = {
  techStudies: require("../assets/ClickablePictures/books/Technologies_studies_iN_Zambia.jpg"),
  womenInZambia: require("../assets/ClickablePictures/books/WomenInZambia.jpg"),
  zambia3: require("../assets/ClickablePictures/books/zambia3.jpg"),
  zambia4: require("../assets/ClickablePictures/books/zambia4.jpg"),
};

/* =====================================================
   BOOK DATA
===================================================== */

const BOOKS: Product[] = [
  {
    id: 1,
    name: "Technology Studies in Zambia",
    price: 120,
    stock: true,
    image: BOOK_IMAGES.techStudies,
  },
  {
    id: 2,
    name: "Women in Zambia",
    price: 99,
    stock: true,
    image: BOOK_IMAGES.womenInZambia,
  },
  {
    id: 3,
    name: "Zambia History Volume 3",
    price: 150,
    stock: true,
    image: BOOK_IMAGES.zambia3,
  },
  {
    id: 4,
    name: "Zambia Culture Book",
    price: 130,
    stock: true,
    image: BOOK_IMAGES.zambia4,
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
  onAddToCart?: (product: Product) => void;
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

        <Text style={[styles.stock, !product.stock && styles.outOfStock]}>
          {product.stock ? "In Stock" : "Out of Stock"}
        </Text>

        {/* Quantity Controller */}
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
          <Text style={styles.cartText}>
            Add to Cart — R {totalPrice.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* =====================================================
   BOOKS PAGE
===================================================== */

export default function BooksPage({ onAddToCart }: Props) {
  const router = useRouter();

  const [cartCache, setCartCache] = useState<any[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const stored = await AsyncStorage.getItem("CART_ITEMS");
      if (stored) setCartCache(JSON.parse(stored));
    } catch (error) {
      console.log(error);
    }
  };

  /* =====================================================
     STORAGE SAFE ADD CART
  ===================================================== */
  const handleAddBook = async (product: Product) => {
    try {
      const stored = await AsyncStorage.getItem("CART_ITEMS");

      let cart: any[] = stored ? JSON.parse(stored) : [];

      const index = cart.findIndex((item) => item.id === product.id);

      /* ============================
       CART MERGE ENGINE
    ============================ */

      if (index !== -1) {
        cart[index].quantity =
          (cart[index].quantity || 1) + (product.quantity || 1);
      } else {
        cart.push({
          ...product,
          quantity: product.quantity || 1,
        });
      }

      /* ============================
       SAVE CART
    ============================ */

      await AsyncStorage.setItem("CART_ITEMS", JSON.stringify(cart));

      setCartCache(cart);

      /* ============================
       GLOBAL BADGE REFRESH
    ============================ */

      if ((global as any).cartRefresh) {
        await (global as any).cartRefresh();
      }

      /* ============================
       SUCCESS POPUP
    ============================ */

      import("react-native").then(({ Alert }) => {
        Alert.alert(
          "✅ Added to Cart",
          `${product.name} successfully added to cart 🛒`,
        );
      });

      onAddToCart?.(product);
    } catch (error) {
      console.log("BOOK CART ADD ERROR:", error);

      import("react-native").then(({ Alert }) => {
        Alert.alert("❌ Cart Error", "Failed to add book to cart.");
      });
    }
  };
  /* =====================================================
     UI
  ===================================================== */

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <MaterialIcons name="home" size={28} color="#2563eb" />
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>📚 Educational Books Collection</Text>

      <FlatList
        data={BOOKS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductRow product={item} onAddToCart={handleAddBook} />
        )}
        ListFooterComponent={<Footer />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </SafeAreaView>
  );
}

/* =====================================================
   STYLES
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

  outOfStock: {
    color: "#999",
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
