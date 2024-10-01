import React, { useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { useUploadCat } from "@/features/Upload/useUploadCat";
import { View } from "react-native";
import colors from "tailwindcss/colors";
import { useCustomToast } from "@/hooks/useCustomToast";

type Props = {};

export const UploadCTA = ({}: Props) => {
  const { handleUpload, isSuccess, isPending } = useUploadCat();
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        style={{
          display: "flex",
          flex: 0.3,
          aspectRatio: 1,
          borderRadius: 24,
        }}
        className="shadow"
        onPress={handlePickImage}
        disabled={isPending}
      >
        {isPending ? <ButtonSpinner color={colors.gray[400]} /> : null}
        <ButtonText>Upload your cat</ButtonText>
      </Button>
    </View>
  );
};
