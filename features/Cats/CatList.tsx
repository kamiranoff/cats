import React, { useCallback } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { Cat, useGetCats } from "@/features/Cats/useGetCats";
import { CatListItem } from "@/features/Cats/CatListItem";

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
      style={{
        flex: 1,
      }}
      data={cats}
      refreshing={isPending}
      contentContainerClassName="flex flex-1"
      contentContainerStyle={{
        flexGrow: 1,
        gap: 8,
      }}
      numColumns={1}
      ListEmptyComponent={() => <View />}
      renderItem={renderItem}
      onEndReached={handleEndReached}
      keyExtractor={(item) => item.id}
    />
  );
};
