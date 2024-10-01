import { CAT_API_BASE_HEADERS, CAT_API_V1_BASE_URL } from "@/api/Api";
import { GET_FAVOURITE_QUERY_KEY } from "@/features/Cats/useGetFavourite";
import { queryClient } from "@/app/ReactQueryClient";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useCustomToast } from "@/hooks/useCustomToast";
import colors from "tailwindcss/colors";

async function deleteFavourite({ favouriteId }: { favouriteId: string }) {
  const response = await fetch(
    `${CAT_API_V1_BASE_URL}/favourites/${favouriteId}`,
    {
      method: "DELETE",
      headers: CAT_API_BASE_HEADERS,
    },
  );
  return response.json();
}

export function useDeleteFavourite() {
  const { showNewToast } = useCustomToast();

  const { mutate, error, isPending } = useMutation({
    mutationFn: deleteFavourite,
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

  const handleDeleteFavourite = useCallback(
    async (favouriteId: string) => {
      mutate({ favouriteId });
    },
    [mutate],
  );

  return {
    handleDeleteFavourite,
    error,
    isPending,
  };
}
