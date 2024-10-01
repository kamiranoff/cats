import { useQuery } from "@tanstack/react-query";
import { CAT_API_BASE_HEADERS, CAT_API_V1_BASE_URL } from "@/api/Api";
import { useMemo } from "react";

type Response = {
  id: string;
  user_id: string;
  image_id: string;
  sub_id: string | null;
  created_at: string;
  image: {
    id: string;
    url: string;
  };
}[];

const getFavourites = async (): Promise<Response> => {
  const response = await fetch(`${CAT_API_V1_BASE_URL}/favourites`, {
    headers: CAT_API_BASE_HEADERS,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const GET_FAVOURITE_QUERY_KEY = "GET_FAVOURITE_QUERY_KEY";

export function useGetFavourites() {
  const { data, error } = useQuery({
    queryFn: () => getFavourites(),
    queryKey: [GET_FAVOURITE_QUERY_KEY],
  });

  const favouriteCatIds = useMemo(
    () =>
      data?.map((favourite) => ({
        favouriteId: favourite.id,
        imageId: favourite.image.id,
      })) ?? [],
    [data],
  );

  return {
    favouriteCatIds,
    error,
  };
}
