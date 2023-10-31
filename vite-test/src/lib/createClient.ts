import { createClient } from "contentful";

const getContentfulClient = () => {
  // Access environment variables directly from import.meta.env
  const { VITE_SPACE_ID, VITE_ACCESS_TOKEN } = import.meta.env;

  if (!VITE_SPACE_ID) {
    throw new Error("contentful SPACE_ID is missing");
  }
  if (!VITE_ACCESS_TOKEN) {
    throw new Error("contentful ACCESS_TOKEN is missing");
  }

  const client = createClient({
    space: VITE_SPACE_ID,
    accessToken: VITE_ACCESS_TOKEN,
  });

  return client;
};

export const contentfulClient = getContentfulClient();
