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
}

interface Props {
  onAddToCart?: (product: Product) => void;
}

/* =====================================================
   IMAGE DATABASE
===================================================== */

const PET_IMAGES: Record<string, any> = {
  vetReport: require("../assets/ClickablePictures/pets/2023-vet-report__preview.jpg"),
  pet2: require("../assets/ClickablePictures/pets/pet2.jpg"),
  pet3: require("../assets/ClickablePictures/pets/pet3.jpg"),
  pets: require("../assets/ClickablePictures/pets/pets.jpg"),
};

/* =====================================================
   PET DATASET
===================================================== */

const PET_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Veterinary Health Report Package",
    price: 250,
    stock: true,
    image: PET_IMAGES.vetReport,
  },
  {
    id: 2,
    name: "Domestic Pet Care Guide",
    price: 180,
    stock: true,
    image: PET_IMAGES.pet2,
  },
  {
    id: 3,
    name: "Animal Wellness Consultation",
    price: 300,
    stock: true,
    image: PET_IMAGES.pet3,
  },
  {
    id: 4,
    name: "General Pet Supplies Bundle",
    price: 220,
    stock: true,
    image: PET_IMAGES.pets,
  },
];

/* =====================================================
   PRODUCT ROW COMPONENT
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
   PETS PAGE
===================================================== */

export default function PetsPage({ onAddToCart }: Props) {
  const router = useRouter();

  const [cartCache, setCartCache] = useState<any[]>([]);

  /* =====================================================
     LOAD STORAGE CART
  ===================================================== */

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await AsyncStorage.getItem("CART_ITEMS");
      if (data) setCartCache(JSON.parse(data));
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

  /* =====================================================
     ADD PET TO CART STORAGE
  ===================================================== */

  const handleAddPet = async (product: Product) => {
    const newCart = [...cartCache, product];

    setCartCache(newCart);
    await saveCart(newCart);

    onAddToCart?.(product);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <MaterialIcons name="home" size={28} color="#2563eb" />
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>🐾 Pet Services & Animal Care</Text>

      <FlatList
        data={PET_PRODUCTS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductRow product={item} onAddToCart={handleAddPet} />
        )}
        showsVerticalScrollIndicator={false}
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
