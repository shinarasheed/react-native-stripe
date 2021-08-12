import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StripeApp from "./src/StripeApp";
import CheckoutScreen from "./src/Checkout";
import { StripeProvider } from "@stripe/stripe-react-native";
export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51HncPtCk8BZejRa7WTeuw97ycVSLZY5B5FR6lveWACcRvmQZ0lKSV2XRAWURK78I1C9DuU7tI1qFXxwzg1iP3FAi00ADupm8gz">
      <CheckoutScreen />
      {/* <StripeApp /> */}
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
