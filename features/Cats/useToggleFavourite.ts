import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { CAT_API_BASE_HEADERS, CAT_API_V1_BASE_URL } from "@/api/Api";
import { GET_FAVOURITE_QUERY_KEY } from "@/features/Cats/useGetFavourite";
import { queryClient } from "@/app/ReactQueryClient";
import { useCustomToast } from "@/hooks/useCustomToast";
import colors from "tailwindcss/colors";

async function toggleFavourite({
  imageId,
  subId,
}: {
  imageId: string;
  subId?: string;
}) {
  const body = {
    image_id: imageId,
    sub_id: subId,
  };

  const response = await fetch(`${CAT_API_V1_BASE_URL}/favourites`, {
    method: "POST",
    headers: CAT_API_BASE_HEADERS,
    body: JSON.stringify(body),
  });
  return await response.json();
}

export function useToggleFavourite({
  imageId,
  subId,
}: {
  imageId: string;
  subId?: string;
}) {
  const { showNewToast } = useCustomToast();
  const { isPending, mutate, error, isSuccess } = useMutation({
    mutationFn: toggleFavourite,
    onError: () => {
      return showNewToast({
        title: "Error",
        description: "something went wrong",
        customStyle: {
          backgroundColor: colors.red[900],
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_FAVOURITE_QUERY_KEY],
      });
    },
  });

  const handleToggleFavourite = useCallback(() => {
    mutate({ imageId, subId });
  }, [imageId, mutate, subId]);

  return {
    isPending,
    isSuccess,
    handleToggleFavourite,
    error,
  };
}
