import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import CategoryList from "../components/CategoryList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function HomeScreen() {
  const { products } = useProducts();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      {/* Navigation Link Section */}
      <View style={styles.navSection}>
        <TouchableOpacity
          style={styles.aboutButton}
          activeOpacity={0.85}
          onPress={() => router.push("/about")}
        >
          <Text style={styles.aboutText}>About ShopSphere</Text>
        </TouchableOpacity>
      </View>

      {/* Product Listing */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={<CategoryList />}
        ListFooterComponent={<Footer />}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.listContainer}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={7}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  navSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  aboutButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
  },

  aboutText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
    letterSpacing: 0.5,
  },

  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 60,
  },
});
