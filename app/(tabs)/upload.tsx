import { ThemedContainer } from "@/components/ThemedContainer";
import React from "react";
import { StyleSheet } from "react-native";
import { UploadCTA } from "@/features/Upload/UploadCTA";

export default function Upload() {
  return (
    <ThemedContainer style={styles.container}>
      <UploadCTA />
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
