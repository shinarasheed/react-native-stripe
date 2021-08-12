import React, { useState, useEffect } from "react";
import { Platform, View, Button, StyleSheet, Alert, Text } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
export default function CheckoutScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState();

  // const API_URL =
  //   Platform.OS === "android"
  //     ? "http://10.0.2.2:3000"
  //     : "http://127.0.0.1:3000";

  const API_URL = "https://desolate-brook-73071.herokuapp.com";

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
    }).catch((error=>{
      console.log(error)
    }));
    const { paymentIntent, ephemeralKey, customer } = await response.json();
    setClientSecret(paymentIntent);

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      customerId: customer,
      googlePay: true,
      merchantCountryCode: "US",
      testEnv: true, // use test environment
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet({ clientSecret });

    if (error) {
      Alert.alert(`${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        // disabled={!loading}
        title="Checkout"
        onPress={openPaymentSheet}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
});
