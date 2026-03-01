import { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Category {
  id: number;
  title: string;
  imageKey: string;
}

const images: Record<string, any> = {
  pets: require("../assets/ClickablePictures/2023-vet-report__preview.jpg"),
  home: require("../assets/ClickablePictures/a-mop-bucket-with-cleaning-supplies-and-brushes-against-a-living-room-background.__preview.jpg"),
  sports: require("../assets/ClickablePictures/bike-accessories__preview.jpg"),
  books: require("../assets/ClickablePictures/breaking-down-seamless-event-logistics__preview.jpg"),
  outdoor: require("../assets/ClickablePictures/camping.jpg"),
  collectibles: require("../assets/ClickablePictures/close_up_view_of_worn_out_collectible_coins_scattered_on_a_flat_surface_1_1d279bd0e9.jpg__preview.jpg"),
  hardware: require("../assets/ClickablePictures/construction-carpentry-tools-electric-corded-circular-saw-cordless-drill-background-min__preview.jpg"),
  jewelry: require("../assets/ClickablePictures/goldnecklace_660x550_6df12311-a226-49ed-a709-2bd12a8006f5_2048x2048.__preview.jpg"),
  music: require("../assets/ClickablePictures/Guiter.jpg"),
  default: require("../assets/images/icon.png"),
};

const CATEGORIES: Category[] = [
  { id: 1, title: "Pets", imageKey: "pets" },
  { id: 2, title: "Home", imageKey: "home" },
  { id: 3, title: "Sports", imageKey: "sports" },
  { id: 4, title: "Books", imageKey: "books" },
  { id: 5, title: "Outdoor", imageKey: "outdoor" },
  { id: 6, title: "Collectibles", imageKey: "collectibles" },
  { id: 7, title: "Hardware", imageKey: "hardware" },
  { id: 8, title: "Jewelry", imageKey: "jewelry" },
  { id: 9, title: "Music", imageKey: "music" },
];

const CategoryItem = memo(({ item }: { item: Category }) => {
  const imageSource = images[item.imageKey] || images.default;

  return (
    <TouchableOpacity style={styles.item}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
});

export default function CategoryImageList() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shop by Category</Text>

      <View>
        {CATEGORIES.map((item) => (
          <CategoryItem key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 16,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 18,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },
});
