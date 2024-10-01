import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { queryClient } from "@/app/ReactQueryClient";
import { GET_CATS_QUERY_KEY } from "@/features/Cats/useGetCats";
import { CAT_API_BASE_HEADERS, CAT_API_V1_BASE_URL } from "@/api/Api";
import { useCustomToast } from "@/hooks/useCustomToast";
import { router } from "expo-router";
import colors from "tailwindcss/colors";

async function uploadCat({ uri }: { uri: string }) {
  let formData = new FormData();
  let fileType = uri.substring(uri.lastIndexOf(".") + 1);

  formData.append("file", {
    uri,
    name: `myCat.${fileType}`,
    type: `image/${fileType}`,
  } as unknown as Blob);

  const response = await fetch(`${CAT_API_V1_BASE_URL}/images/upload`, {
    method: "POST",
    headers: {
      ...CAT_API_BASE_HEADERS,
      contentType: "multipart/form-data",
    },
    body: formData,
  });
  return response.json();
}

export function useUploadCat() {
  const { showNewToast } = useCustomToast();

  const { isPending, mutate, error, isSuccess } = useMutation({
    mutationFn: uploadCat,
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
        queryKey: [GET_CATS_QUERY_KEY],
      });
      router.navigate("/(tabs)");
      showNewToast({
        title: "Success",
        description: "Your cat has been uploaded",
        customStyle: {
          backgroundColor: colors.green[900],
        },
      });
    },
  });

  const handleUpload = useCallback(
    async (url: string) => {
      mutate({ uri: url });
    },
    [mutate],
  );

  return {
    isPending,
    isSuccess,
    handleUpload,
    error,
  };
}
