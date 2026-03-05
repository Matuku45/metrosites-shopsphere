import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import Footer from "../components/Footer";
import Header from "../components/Header";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: any;
}

export default function Checkout() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await AsyncStorage.getItem("CART_ITEMS");
      if (data) setCart(JSON.parse(data));
    } catch (error) {
      console.log(error);
    }
  };

  const saveCart = async (items: CartItem[]) => {
    await AsyncStorage.setItem("CART_ITEMS", JSON.stringify(items));
  };

  const clearCart = async () => {
    await AsyncStorage.removeItem("CART_ITEMS");
    setCart([]);
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item,
    );

    setCart(updated);
    saveCart(updated);
  };

  const removeItem = (id: string) => {
    const filtered = cart.filter((item) => item.id !== id);
    setCart(filtered);
    saveCart(filtered);
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const processPayment = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep(3);
      clearCart();
    }, 2500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />

        {/* PAGE TITLE */}
        <View style={styles.pageTitleBlock}>
          <Text style={styles.pageTitle}>Complete your order</Text>
          <Text style={styles.orderCode}>Order ID: 2LE5RJVXCGJY67M9</Text>
        </View>

        {/* STEPPER */}
        <View style={styles.breadcrumbRow}>
          <Text
            style={step === 1 ? styles.breadcrumbActive : styles.breadcrumb}
          >
            Order Summary
          </Text>
          <MaterialIcons name="chevron-right" size={18} />

          <Text
            style={step === 2 ? styles.breadcrumbActive : styles.breadcrumb}
          >
            Payment
          </Text>
          <MaterialIcons name="chevron-right" size={18} />

          <Text
            style={step === 3 ? styles.breadcrumbActive : styles.breadcrumb}
          >
            Confirmation
          </Text>
        </View>

        {/* STEP 1 CART */}
        {step === 1 && (
          <>
            {cart.map((product) => (
              <View key={product.id} style={styles.cartItemCard}>
                <Image
                  source={product.image || require("../assets/images/icon.png")}
                  style={styles.productImage}
                />

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.productName}>{product.name}</Text>

                  <View style={styles.quantityRow}>
                    <TouchableOpacity
                      style={styles.quantityBox}
                      onPress={() => updateQuantity(product.id, -1)}
                    >
                      <Text>-</Text>
                    </TouchableOpacity>

                    <Text style={{ marginHorizontal: 12 }}>
                      {product.quantity}
                    </Text>

                    <TouchableOpacity
                      style={styles.quantityBox}
                      onPress={() => updateQuantity(product.id, 1)}
                    >
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity onPress={() => removeItem(product.id)}>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Order summary</Text>

              <View style={styles.summaryRow}>
                <Text>Subtotal</Text>
                <Text style={styles.priceText}>
                  ZMW {subtotal.toLocaleString()}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => setStep(2)}
              >
                <Text style={styles.checkoutText}>Proceed to Payment</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* STEP 2 PAYMENT */}
        {step === 2 && (
          <View style={styles.paymentCard}>
            <Text style={styles.summaryTitle}>Payment Details</Text>

            <TextInput
              placeholder="Card Number"
              style={styles.input}
              value={cardNumber}
              onChangeText={setCardNumber}
            />

            <TextInput
              placeholder="Card Holder Name"
              style={styles.input}
              value={cardName}
              onChangeText={setCardName}
            />

            <TextInput
              placeholder="MM/YY"
              style={styles.input}
              value={expiry}
              onChangeText={setExpiry}
            />

            <TextInput
              placeholder="CVV"
              style={styles.input}
              value={cvv}
              secureTextEntry
              onChangeText={setCvv}
            />

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={processPayment}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.checkoutText}>
                  Pay ZMW {subtotal.toLocaleString()}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* STEP 3 SUCCESS */}
        {step === 3 && (
          <View style={styles.successCard}>
            <MaterialIcons name="check-circle" size={90} color="#22c55e" />

            <Text style={styles.successTitle}>Payment Successful 🎉</Text>

            <Text style={styles.successText}>
              Your order has been placed successfully.
            </Text>

            <Text style={styles.successText}>
              Thank you for shopping with Zambezi.
            </Text>
          </View>
        )}

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ===========================
STYLES
=========================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  pageTitleBlock: {
    padding: 20,
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },

  orderCode: {
    fontSize: 12,
    color: "#888",
  },

  breadcrumbRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  breadcrumbActive: {
    color: "#2563eb",
    fontWeight: "600",
  },

  breadcrumb: {
    color: "#888",
  },

  cartItemCard: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: 12,
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
  },

  productImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },

  productName: {
    fontWeight: "600",
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  quantityBox: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },

  removeText: {
    color: "#2563eb",
  },

  summaryCard: {
    backgroundColor: "white",
    margin: 12,
    padding: 20,
    borderRadius: 18,
  },

  paymentCard: {
    backgroundColor: "white",
    margin: 12,
    padding: 20,
    borderRadius: 18,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  priceText: {
    fontWeight: "700",
  },

  checkoutButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 14,
    marginTop: 20,
    alignItems: "center",
  },

  checkoutText: {
    color: "white",
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },

  successCard: {
    backgroundColor: "white",
    margin: 20,
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
  },

  successTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },

  successText: {
    marginTop: 6,
    color: "#666",
    textAlign: "center",
  },
});
