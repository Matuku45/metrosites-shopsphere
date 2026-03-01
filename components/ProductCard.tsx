import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
  vetReport: require("../assets/ClickablePictures/2023-vet-report__preview.jpg"),
  mopBucket: require("../assets/ClickablePictures/a-mop-bucket-with-cleaning-supplies-and-brushes-against-a-living-room-background.__preview.jpg"),
  bikeAccessories: require("../assets/ClickablePictures/bike-accessories__preview.jpg"),
  eventLogistics: require("../assets/ClickablePictures/breaking-down-seamless-event-logistics__preview.jpg"),
  camping: require("../assets/ClickablePictures/camping.jpg"),
  coins: require("../assets/ClickablePictures/close_up_view_of_worn_out_collectible_coins_scattered_on_a_flat_surface_1_1d279bd0e9.jpg__preview.jpg"),
  constructionTools: require("../assets/ClickablePictures/construction-carpentry-tools-electric-corded-circular-saw-cordless-drill-background-min__preview.jpg"),
  goldNecklace: require("../assets/ClickablePictures/goldnecklace_660x550_6df12311-a226-49ed-a709-2bd12a8006f5_2048x2048.__preview.jpg"),
  guitar: require("../assets/ClickablePictures/Guiter.jpg"),

  default: require("../assets/images/icon.png"),
};

/* =============================
   Sample Product Data
============================= */
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Veterinary Report 2023",
    price: 19.99,
    imageKey: "vetReport",
    category: "Pets",
  },
  {
    id: 2,
    name: "Cleaning Mop Bucket Set",
    price: 29.99,
    imageKey: "mopBucket",
    category: "Home",
  },
  {
    id: 3,
    name: "Bike Accessories Kit",
    price: 45.5,
    imageKey: "bikeAccessories",
    category: "Sports",
  },
  {
    id: 4,
    name: "Event Logistics Guide",
    price: 15.0,
    imageKey: "eventLogistics",
    category: "Books",
  },
  {
    id: 5,
    name: "Camping Equipment",
    price: 89.99,
    imageKey: "camping",
    category: "Outdoor",
  },
  {
    id: 6,
    name: "Rare Coin Collection",
    price: 120.0,
    imageKey: "coins",
    category: "Collectibles",
  },
  {
    id: 7,
    name: "Construction Tool Kit",
    price: 199.99,
    imageKey: "constructionTools",
    category: "Hardware",
  },
  {
    id: 8,
    name: "Gold Necklace",
    price: 349.99,
    imageKey: "goldNecklace",
    category: "Jewelry",
  },
  {
    id: 9,
    name: "Acoustic Guitar",
    price: 259.99,
    imageKey: "guitar",
    category: "Music",
  },
];

/* =============================
   Product Card Component
============================= */
function ProductCard({ product }: ProductCardProps) {
  const imageSource = images[product.imageKey] || images.default;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      </View>

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
   Main Products Screen
============================= */
export default function ProductsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>ShopSphere Products</Text>

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <ProductCard product={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

/* =============================
   Styles
============================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 10,
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 15,
    color: "#111",
  },

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
