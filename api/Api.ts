if (!process.env.EXPO_PUBLIC_CAT_API_KEY) {
  throw new Error("CAT_API_KEY is not set");
}

export const CAT_API_V1_BASE_URL = "https://api.thecatapi.com/v1";

export const CAT_API_BASE_HEADERS = {
  "x-api-key": process.env.EXPO_PUBLIC_CAT_API_KEY,
  "Content-Type": "application/json",
};
