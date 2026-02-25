import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import CategoryList from "../components/CategoryList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function HomeScreen() {
  const { products } = useProducts();

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<CategoryList />}
        ListFooterComponent={<Footer />}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },
  listContainer: {
    padding: 15,
    paddingBottom: 40,
  },
});
