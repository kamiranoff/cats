import { CAT_API_BASE_HEADERS, CAT_API_V1_BASE_URL } from "@/api/Api";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { queryClient } from "@/app/ReactQueryClient";
import {
  GET_VOTES_BY_SUB_ID_QUERY_KEY,
  GetVotesResponse,
} from "@/features/Cats/useGetVotes";
import colors from "tailwindcss/colors";
import { useCustomToast } from "@/hooks/useCustomToast";

type Response = {
  message: string;
  id: number;
  image_id: string;
  value: number;
  country_code: string;
};

async function voteCat({
  imageId,
  vote,
}: {
  imageId: string;
  vote: "up" | "down";
}): Promise<Response> {
  const response = await fetch(`${CAT_API_V1_BASE_URL}/votes`, {
    method: "POST",
    headers: CAT_API_BASE_HEADERS,
    body: JSON.stringify({ image_id: imageId, value: vote === "up" ? 1 : -1 }),
  });
  return response.json();
}

export function useVoteCat() {
  const { showNewToast } = useCustomToast();
  const { isPending, mutate, error, isSuccess } = useMutation({
    mutationFn: voteCat,
    onError: () => {
      return showNewToast({
        title: "Error",
        description: "something went wrong",
        customStyle: {
          backgroundColor: colors.red[900],
        },
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [GET_VOTES_BY_SUB_ID_QUERY_KEY],
      });
    },
  });

  const handleVoteCat = useCallback(
    ({ imageId, vote }: { imageId: string; vote: "up" | "down" }) => {
      mutate({ imageId, vote });
    },
    [mutate],
  );

  return {
    isPending,
    isSuccess,
    handleVoteCat,
    error,
  };
}
