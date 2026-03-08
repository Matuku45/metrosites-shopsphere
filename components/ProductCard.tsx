import { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Category {
  id: number;
  title: string;
  imageKey: string;
  department: string;
}

interface Props {
  onSelect?: (value: string) => void;
}

const images: Record<string, any> = {
  pets: require("../assets/ClickablePictures/2023-vet-report__preview.jpg"),
  home: require("../assets/ClickablePictures/Food/JuicySoda6Pacs.jpg"),
  sports: require("../assets/ClickablePictures/bike-accessories__preview.jpg"),
  books: require("../assets/ClickablePictures/textbooks/biology.jpg"),
  outdoor: require("../assets/ClickablePictures/Food/noodles.jpg"),
  collectibles: require("../assets/ClickablePictures/close_up_view_of_worn_out_collectible_coins_scattered_on_a_flat_surface_1_1d279bd0e9.jpg__preview.jpg"),
  hardware: require("../assets/ClickablePictures/ElectronicAccessories/AppleIphone.jpg"),
  jewelry: require("../assets/ClickablePictures/goldnecklace_660x550_6df12311-a226-49ed-a709-2bd12a8006f5_2048x2048.__preview.jpg"),
  music: require("../assets/ClickablePictures/Guiter.jpg"),
  default: require("../assets/images/icon.png"),
};

const CATEGORIES: Category[] = [
  { id: 1, title: "Pets", imageKey: "pets", department: "Pets & Animals" },
  { id: 2, title: "Drinks", imageKey: "home", department: "Food" },
  { id: 3, title: "Books", imageKey: "sports", department: "Electronics" },
  { id: 4, title: "TexsBooks", imageKey: "books", department: "Books" },
  { id: 5, title: "Food", imageKey: "outdoor", department: "Food" },

  {
    id: 7,
    title: "Electronics Appliance",
    imageKey: "hardware",
    department: "Electronics",
  },
  {
    id: 9,
    title: "Music",
    imageKey: "music",
    department: "Musical Instruments",
  },
];

const CategoryItem = memo(
  ({
    item,
    onSelect,
  }: {
    item: Category;
    onSelect?: (value: string) => void;
  }) => {
    const imageSource = images[item.imageKey] || images.default;

    const handlePress = () => {
      if (onSelect) {
        onSelect(item.department);
      }
    };

    return (
      <TouchableOpacity style={styles.item} onPress={handlePress}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  },
);

export default function CategoryImageList({ onSelect }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shop by Category</Text>

      <View>
        {CATEGORIES.map((item) => (
          <CategoryItem key={item.id} item={item} onSelect={onSelect} />
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
