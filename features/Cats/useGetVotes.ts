import {CAT_API_BASE_HEADERS, CAT_API_V1_BASE_URL} from "@/api/Api";
import {useQuery} from "@tanstack/react-query";
import {useMemo} from "react";

export type GetVotesResponse = {
  id: number;
  image_id: string;
  sub_id: string | null;
  created_at: string;
  value: number;
  country_code: string;
  image: {
    id: string;
    url: string;
  };
}[];

type Vote = {
  image_id: string;
  value: number;
};

async function getVotes(): Promise<GetVotesResponse> {
  const response = await fetch(`${CAT_API_V1_BASE_URL}/votes`, {
    headers: CAT_API_BASE_HEADERS,
  });
  return response.json();
}

export const GET_VOTES_BY_SUB_ID_QUERY_KEY = "GET_VOTES_BY_SUB_ID_QUERY_KEY";

export function useGetVotes() {
  const { data, isPending } = useQuery({
    queryFn: getVotes,
    queryKey: [GET_VOTES_BY_SUB_ID_QUERY_KEY],
  });

  const votes = useMemo(() => {
    return (
      data?.reduce<Vote[]>((acc, vote) => {
        const existingVote = acc.find((v) => v.image_id === vote.image.id);

        if (existingVote) {
          return acc.map((v) => {
            if (v.image_id === vote.image.id) {
              return { image_id: v.image_id, value: vote.value + v.value };
            }
            return v;
          });
        }

        return [...acc, { image_id: vote.image.id, value: vote.value }];
      }, []) ?? []
    );
  }, [data]);

  return {
    votes,
    isPending,
  };
}
