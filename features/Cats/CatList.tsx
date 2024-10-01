import React, { useCallback } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { Cat, useGetCats } from "@/features/Cats/useGetCats";
import { CatListItem } from "@/features/Cats/CatListItem";
import { CatAnimation } from "@/components/ui/catAnimation/CatAnimation";

type Props = {};

export const CatList = ({}: Props) => {
  const { cats, isPending, fetchNextPage, hasNextPage } = useGetCats();
  const renderItem: ListRenderItem<Cat> = useCallback(({ item }) => {
    return <CatListItem item={item} />;
  }, []);

  const handleEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  return (
    <FlatList
      style={styles.container}
      data={cats}
      refreshing={isPending}
      contentContainerClassName="flex flex-1"
      contentContainerStyle={styles.contentContainer}
      numColumns={1}
      ListEmptyComponent={CatAnimation}
      renderItem={renderItem}
      onEndReached={handleEndReached}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    gap: 8,
  },
});
