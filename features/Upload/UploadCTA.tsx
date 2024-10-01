import React, { useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { useUploadCat } from "@/features/Upload/useUploadCat";
import { View, StyleSheet } from "react-native";
import colors from "tailwindcss/colors";
import { useCustomToast } from "@/hooks/useCustomToast";

type Props = {};

export const UploadCTA = ({}: Props) => {
  const { handleUpload, isPending } = useUploadCat();
  const { showNewToast } = useCustomToast();

  const handlePickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result?.assets?.[0]?.uri) {
      return showNewToast({
        title: "Error",
        description: "No image selected",
        customStyle: {
          backgroundColor: colors.red[900],
        },
      });
    }

    handleUpload(result.assets[0].uri);
  }, [handleUpload, showNewToast]);
  return (
    <View style={styles.container}>
      <Button
        style={styles.btn}
        className="shadow"
        onPress={handlePickImage}
        disabled={isPending}
      >
        {isPending ? (
          <ButtonSpinner color={colors.gray[400]} />
        ) : (
          <ButtonText>Upload your cat</ButtonText>
        )}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    display: "flex",
    flex: 0.3,
    aspectRatio: 1,
    borderRadius: 24,
  },
});
