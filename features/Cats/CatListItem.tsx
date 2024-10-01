import React, { useCallback } from "react";
import { Cat } from "@/features/Cats/useGetCats";
import { Box } from "@/components/ui/box";
import { Dimensions, Image, View } from "react-native";
import { HStack } from "@/components/ui/hstack";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useToggleFavourite } from "@/features/Cats/useToggleFavourite";
import colors from "tailwindcss/colors";
import { useDeleteFavourite } from "@/features/Cats/useDeleteFavourite";
import { useVoteCat } from "@/features/Cats/useVoteCat";
import { Text } from "@/components/ui/text";

type Props = {
  item: Cat;
};

export const CatListItem = ({ item }: Props) => {
  const { handleDeleteFavourite } = useDeleteFavourite();
  const { handleVoteCat } = useVoteCat();
  const { handleToggleFavourite } = useToggleFavourite({
    imageId: item.id,
    subId: item.subId,
  });

  const handVoteUp = useCallback(() => {
    handleVoteCat({ imageId: item.id, vote: "up" });
  }, [handleVoteCat, item.id]);

  const handleVoteDown = useCallback(() => {
    handleVoteCat({ imageId: item.id, vote: "down" });
  }, [handleVoteCat, item.id]);

  const handlePresToggleFavourite = useCallback(() => {
    if (item.favouriteId) {
      return handleDeleteFavourite(item.favouriteId);
    }
    return handleToggleFavourite();
  }, [handleDeleteFavourite, handleToggleFavourite, item.favouriteId]);

  return (
    <Box
      style={{
        width: "100%",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 10,
        }}
      >
        <MaterialCommunityIcons
          name={item.favouriteId ? "star" : "star-outline"}
          size={28}
          style={{
            color: item.favouriteId ? colors.yellow[500] : colors.gray[900],
          }}
          onPress={handlePresToggleFavourite}
        />
      </View>
      <Image
        source={{
          uri: item.url,
        }}
        width={Dimensions.get("window").width}
        height={Dimensions.get("window").width}
        alt={item.url}
        style={{ width: "100%", aspectRatio: 1 }}
      />
      <HStack
        style={{
          justifyContent: "space-evenly",
          padding: 8,
          position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.8)",
        }}
      >
        <MaterialCommunityIcons
          name="thumb-up"
          size={28}
          onPress={handVoteUp}
        />
        <Text>{item.vote}</Text>
        <MaterialCommunityIcons
          name="thumb-down"
          size={28}
          onPress={handleVoteDown}
        />
      </HStack>
    </Box>
  );
};
