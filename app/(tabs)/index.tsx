import { ThemedContainer } from "@/components/ThemedContainer";
import React from "react";
import { Text } from "react-native";
import { CatList } from "@/features/Cats/CatList";

export default function HomeScreen() {
  return (
    <ThemedContainer
      edges={["top"]}
      style={{
        flex: 1,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          margin: 20,
        }}
      >
        CATS
      </Text>
      <CatList />
    </ThemedContainer>
  );
}
