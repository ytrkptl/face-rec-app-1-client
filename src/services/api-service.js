const devOnlyBaseURL = import.meta?.env?.VITE_DEV_ONLY_BASE_API_URL || "http://localhost:5000";
const prodBaseURL =
  import.meta?.env?.VITE_PROD_BASE_API_URL ||
  process?.env?.VITE_PROD_BASE_API_URL ||
  "https://www.face-rec-app-api.yatrik.dev";

const baseURLForApi = mode !== "production" ? prodBaseURL : devOnlyBaseURL;

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${baseURLForApi}/api${endpoint}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
