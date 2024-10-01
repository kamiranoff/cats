import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { CAT_API_BASE_HEADERS, CAT_API_V1_BASE_URL } from "@/api/Api";
import { useGetFavourites } from "@/features/Cats/useGetFavourite";
import { useGetVotes } from "@/features/Cats/useGetVotes";

const NUM_CATS_PER_PAGE = 10;

type Response = {
  id: string;
  url: string;
  width: number;
  height: number;
  created_at: string;
  original_filename: string;
}[];

export type Cat = {
  id: string;
  width: number;
  height: number;
  url: string;
  subId?: string;
  favouriteId: string | null;
  vote: number;
};

async function getCats({ page }: { page: number }): Promise<Response> {
  const response = await fetch(
    `${CAT_API_V1_BASE_URL}/images/?limit=${NUM_CATS_PER_PAGE}&page=${page}`,
    {
      headers: CAT_API_BASE_HEADERS,
    },
  );
  return response.json();
}

export const GET_CATS_QUERY_KEY = "GET_CATS_QUERY_KEY";

export function useGetCats() {
  const { favouriteCatIds } = useGetFavourites();
  const { votes } = useGetVotes();
  const { isPending, data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [GET_CATS_QUERY_KEY],
    queryFn: ({ pageParam = 0 }) => {
      return getCats({ page: pageParam });
    },
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < NUM_CATS_PER_PAGE) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    initialPageParam: 0,
  });

  const cats = useMemo(() => {
    return data?.pages.flatMap((page) =>
      page
        .map((c) => ({
          id: c.id,
          url: c.url,
          width: c.width,
          height: c.height,
          favouriteId:
            favouriteCatIds.find((f) => f.imageId === c.id)?.favouriteId ||
            null,
          vote: votes.find((v) => v.image_id === c.id)?.value ?? 0,
        }))
        .filter((c): c is Cat =>
          Boolean(c.width > 0 && c.height > 0 && c.url && c.id),
        ),
    );
  }, [data?.pages, favouriteCatIds, votes]);

  return {
    isPending,
    cats,
    fetchNextPage,
    hasNextPage,
  };
}
