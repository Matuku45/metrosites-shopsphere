import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
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
  const router = useRouter();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [delivery, setDelivery] = useState("standard");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const data = await AsyncStorage.getItem("CART_ITEMS");
    if (data) setCart(JSON.parse(data));
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
  };

  const removeItem = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const deliveryFee = delivery === "express" ? 80 : 0;
  const total = subtotal + deliveryFee;

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

        {/* TITLE + HOME BUTTON */}

        <View style={styles.titleBox}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.title}>Checkout</Text>
              <Text style={styles.order}>Order ID: ZMB23912</Text>
            </View>

            <TouchableOpacity
              style={styles.homeBtn}
              onPress={() => router.push("/")}
            >
              <MaterialIcons name="home" size={26} color="#2563eb" />
            </TouchableOpacity>
          </View>
        </View>

        {/* STEPPER */}

        <View style={styles.stepper}>
          <Text style={step === 1 ? styles.activeStep : styles.step}>
            Summary
          </Text>

          <MaterialIcons name="chevron-right" size={20} />

          <Text style={step === 2 ? styles.activeStep : styles.step}>
            Payment
          </Text>

          <MaterialIcons name="chevron-right" size={20} />

          <Text style={step === 3 ? styles.activeStep : styles.step}>Done</Text>
        </View>

        {/* CART STEP */}

        {step === 1 && (
          <>
            {cart.map((item) => (
              <View key={item.id} style={styles.card}>
                <Image
                  source={item.image || require("../assets/images/icon.png")}
                  style={styles.image}
                />

                <View style={{ flex: 1 }}>
                  <Text style={styles.product}>{item.name}</Text>
                  <Text style={styles.price}>R {item.price}</Text>

                  <View style={styles.qtyRow}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.id, -1)}
                    >
                      <MaterialIcons name="remove" />
                    </TouchableOpacity>

                    <Text style={styles.qty}>{item.quantity}</Text>

                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.id, 1)}
                    >
                      <MaterialIcons name="add" />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity onPress={() => removeItem(item.id)}>
                  <MaterialIcons
                    name="delete-outline"
                    size={24}
                    color="#2563eb"
                  />
                </TouchableOpacity>
              </View>
            ))}

            {/* DELIVERY */}

            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>Delivery Method</Text>

              <TouchableOpacity
                style={styles.delivery}
                onPress={() => setDelivery("standard")}
              >
                <Text>Standard Delivery (Free)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.delivery}
                onPress={() => setDelivery("express")}
              >
                <Text>Express Delivery (+R80)</Text>
              </TouchableOpacity>
            </View>

            {/* TOTAL */}

            <View style={styles.summary}>
              <View style={styles.row}>
                <Text>Subtotal</Text>
                <Text>R {subtotal}</Text>
              </View>

              <View style={styles.row}>
                <Text>Delivery</Text>
                <Text>R {deliveryFee}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.total}>Total</Text>
                <Text style={styles.total}>R {total}</Text>
              </View>

              <View style={styles.secure}>
                <MaterialIcons name="lock" size={16} color="#22c55e" />
                <Text style={{ marginLeft: 6, color: "#22c55e" }}>
                  Secure Checkout
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => setStep(2)}
              >
                <Text style={styles.buttonText}>Proceed to Payment</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* PAYMENT */}

        {step === 2 && (
          <View style={styles.paymentCard}>
            <Text style={styles.summaryTitle}>Secure Payment</Text>

            <View style={styles.cardPreview}>
              <MaterialIcons name="credit-card" size={28} color="white" />

              <Text style={styles.cardNumber}>
                {cardNumber || "•••• •••• •••• ••••"}
              </Text>

              <Text style={styles.cardValue}>{cardName || "FULL NAME"}</Text>
            </View>

            <TextInput
              placeholder="Card Number"
              value={cardNumber}
              onChangeText={setCardNumber}
              style={styles.input}
            />

            <TextInput
              placeholder="Card Holder"
              value={cardName}
              onChangeText={setCardName}
              style={styles.input}
            />

            <TextInput
              placeholder="CVV"
              value={cvv}
              onChangeText={setCvv}
              secureTextEntry
              style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={processPayment}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Pay R {total}</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* SUCCESS */}

        {step === 3 && (
          <View style={styles.success}>
            <MaterialIcons name="check-circle" size={90} color="#22c55e" />

            <Text style={styles.successTitle}>Order Confirmed 🎉</Text>

            <Text style={styles.successText}>
              Thank you for shopping with Zambezi
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/")}
            >
              <Text style={styles.buttonText}>Return Home</Text>
            </TouchableOpacity>
          </View>
        )}

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fb" },

  titleBox: { padding: 20 },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: { fontSize: 22, fontWeight: "bold" },

  order: { color: "#888" },

  homeBtn: {
    backgroundColor: "#eef2ff",
    padding: 10,
    borderRadius: 12,
  },

  stepper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  step: { color: "#888" },

  activeStep: { color: "#2563eb", fontWeight: "bold" },

  card: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: 12,
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },

  image: { width: 70, height: 70, borderRadius: 12, marginRight: 10 },

  product: { fontWeight: "600" },

  price: { color: "#444" },

  qtyRow: { flexDirection: "row", marginTop: 8, alignItems: "center" },

  qtyBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 5,
    borderRadius: 6,
  },

  qty: { marginHorizontal: 10, fontWeight: "bold" },

  summary: {
    backgroundColor: "white",
    margin: 12,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },

  summaryTitle: { fontWeight: "bold", marginBottom: 10 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },

  total: { fontWeight: "bold", fontSize: 16 },

  secure: { flexDirection: "row", alignItems: "center", marginTop: 10 },

  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },

  buttonText: { color: "white", fontWeight: "bold" },

  paymentCard: {
    backgroundColor: "white",
    margin: 12,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },

  cardPreview: {
    backgroundColor: "#2563eb",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },

  cardNumber: { color: "white", fontSize: 18, marginTop: 10 },

  cardValue: { color: "white", marginTop: 5 },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  delivery: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    marginBottom: 8,
  },

  success: {
    backgroundColor: "white",
    margin: 20,
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
  },

  successTitle: { fontSize: 22, fontWeight: "bold", marginTop: 10 },

  successText: { marginTop: 6, color: "#666" },
});
