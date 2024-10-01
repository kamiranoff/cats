import { ThemedContainer } from "@/components/ThemedContainer";
import React from "react";
import { StyleSheet } from "react-native";
import { CatList } from "@/features/Cats/CatList";
import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
  return (
    <ThemedContainer edges={["top"]} style={styles.container}>
      <ThemedText style={styles.text}>CATS</ThemedText>
      <CatList />
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
  },
});
