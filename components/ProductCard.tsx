import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

/* =============================
   Product Interface
============================= */
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageKey: string;
  category?: string;
}

interface ProductCardProps {
  product: Product;
}

/* =============================
   Image Mapping Registry
============================= */
const images: Record<string, any> = {
  electronics1: require("../assets/images/electronics1.webp"),
  electronics2: require("../assets/images/electronics2.webp"),
  fashion: require("../assets/images/fashion.webp"),
  fashion2: require("../assets/images/fashion2.webp"),
  food: require("../assets/images/food.webp"),
  food2: require("../assets/images/food2.webp"),
  fridge: require("../assets/images/electronicFridge.webp"),
  bags: require("../assets/images/fashionbags.webp"),
  shoes: require("../assets/images/fashionshoes.webp"),
  trousers: require("../assets/images/fashiontrousers.webp"),

  /* Default fallback image */
  default: require("../assets/images/icon.png"),
};

/* =============================
   Product Card Component
============================= */
export default function ProductCard({ product }: ProductCardProps) {
  const imageSource = images[product.imageKey] || images.default;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Text style={styles.category}>{product.category || "ShopSphere"}</Text>

        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

/* =============================
   Styles (Commerce Grid Optimized)
============================= */
const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    overflow: "hidden",
    margin: 6,
    elevation: 3,
    minWidth: "45%",
  },

  imageContainer: {
    width: "100%",
    height: 160,
    backgroundColor: "#f2f2f2",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  content: {
    padding: 10,
  },

  category: {
    fontSize: 11,
    color: "#888",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
    lineHeight: 18,
  },

  price: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "700",
    color: "#2563eb",
  },
});
