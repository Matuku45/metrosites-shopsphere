import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Sample products data
    const sampleProducts: Product[] = [
      {
        id: 1,
        name: "Product 1",
        price: 29.99,
        image: "https://via.placeholder.com/200",
        category: "Category A",
        description: "High quality product",
      },
      {
        id: 2,
        name: "Product 2",
        price: 39.99,
        image: "https://via.placeholder.com/200",
        category: "Category B",
        description: "Premium quality product",
      },
      {
        id: 3,
        name: "Product 3",
        price: 49.99,
        image: "https://via.placeholder.com/200",
        category: "Category A",
        description: "Best seller product",
      },
    ];

    try {
      setProducts(sampleProducts);
      setLoading(false);
    } catch (err) {
      setError("Failed to load products");
      setLoading(false);
    }
  }, []);

  return { products, loading, error };
};
