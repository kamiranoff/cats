import { ThemedContainer } from "@/components/ThemedContainer";
import React from "react";
import { UploadCTA } from "@/features/Upload/UploadCTA";

export default function Upload() {
  return (
    <ThemedContainer
      style={{
        flex: 1,
      }}
    >
      <UploadCTA />
    </ThemedContainer>
  );
}
