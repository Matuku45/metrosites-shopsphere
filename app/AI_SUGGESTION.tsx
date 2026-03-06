import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { GoogleGenerativeAI } from "@google/generative-ai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";

/* ⭐ CONFIG */
const API_KEY = "AIzaSyA2iE-JvMzcFyzWkgrcePUhaD43XKasIR0";

const MODEL_NAME = "gemini-1.5-pro";

let lastRequest = 0;
const COOLDOWN = 8000;

export default function AI_SUGGESTION() {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [showWeb, setShowWeb] = useState(false);

  const generateAI = async () => {
    try {
      if (Date.now() - lastRequest < COOLDOWN) {
        Alert.alert("Wait", "Please wait before requesting AI again.");
        return;
      }

      lastRequest = Date.now();
      setLoading(true);

      const cartData = await AsyncStorage.getItem("CART_ITEMS");
      const cartItems = cartData ? JSON.parse(cartData) : [];

      const genAI = new GoogleGenerativeAI(API_KEY);

      const model = genAI.getGenerativeModel({
        model: MODEL_NAME,
      });

      const prompt = `
You are ShopSphere Smart Shopping Assistant.

User Cart:
${JSON.stringify(cartItems)}

Friendly shopping advice under 150 words.
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;

      setSuggestion(response.text());
    } catch (error) {
      console.log(error);
      setSuggestion("AI suggestion Generating.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateAI();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <MaterialIcons name="smart-toy" size={60} color="#10b981" />

        <Text style={styles.title}>ShopSphere Assistant</Text>
      </View>

      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text style={{ lineHeight: 24 }}>{suggestion}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.refresh} onPress={() => setShowWeb(true)}>
        <MaterialIcons name="home" size={22} color="white" />

        <Text style={{ color: "white", marginLeft: 10 }}>Open AI Panel</Text>
      </TouchableOpacity>

      {/* ⭐ Mobile AI Window */}
      <Modal visible={showWeb} animationType="slide">
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: "#2563eb",
              alignItems: "center",
            }}
            onPress={() => setShowWeb(false)}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Close AI Window
            </Text>
          </TouchableOpacity>

          <WebView
            source={{
              uri: "https://geminiapi-c01h.onrender.com/",
            }}
            style={{ flex: 1 }}
          />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f7fb",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    minHeight: 220,
    elevation: 4,
  },

  refresh: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#2563eb",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
  },
});
