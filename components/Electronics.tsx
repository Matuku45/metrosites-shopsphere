import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Footer from "../components/Footer";

/* =====================================================
   Product Dataset
===================================================== */

interface Product {
  id: number;
  name: string;
  price: number;
  stock: boolean;
  image: any;
}

interface Props {
  onAddToCart?: (product: Product) => void;
}

/* =====================================================
   Product Data
===================================================== */

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Apple iPhone Device",
    price: 899.99,
    stock: true,
    image: require("../assets/ClickablePictures/ElectronicAccessories/AppleIphone.jpg"),
  },
  {
    id: 2,
    name: "Gaming Console Airport Edition",
    price: 299.99,
    stock: true,
    image: require("../assets/ClickablePictures/ElectronicAccessories/gamingconsoleAirports.jpg"),
  },
  {
    id: 3,
    name: "Premium Headphones",
    price: 79.99,
    stock: true,
    image: require("../assets/ClickablePictures/ElectronicAccessories/Headphoness.jpg"),
  },
  {
    id: 4,
    name: "Samsung Fast Adapter",
    price: 24.99,
    stock: false,
    image: require("../assets/ClickablePictures/ElectronicAccessories/SumsungAdapter.webp"),
  },
];

/* =====================================================
   Product Row Component
===================================================== */

function ProductRow({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart?: (product: Product) => void;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <View style={styles.card}>
      <Image source={product.image} style={styles.image} />

      <View style={styles.infoSection}>
        <Text style={styles.title} numberOfLines={2}>
          {product.name}
        </Text>

        <Text style={styles.price}>R {product.price.toFixed(2)}</Text>

        <Text style={[styles.stock, !product.stock && styles.outOfStock]}>
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
          onPress={() => onAddToCart?.({ ...product })}
        >
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* =====================================================
   Electronics Page
===================================================== */

export default function ElectronicsPage({ onAddToCart }: Props) {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== HEADER BAR ===== */}

      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <MaterialIcons name="home" size={28} color="#2563eb" />
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>Smart Electronics Devices</Text>

      {/* ===== PRODUCT LIST ===== */}

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductRow product={item} onAddToCart={onAddToCart} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListFooterComponent={<Footer />}
      />
    </SafeAreaView>
  );
}

/* =====================================================
   Styles
===================================================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 14,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
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

  infoSection: {
    flex: 1,
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
