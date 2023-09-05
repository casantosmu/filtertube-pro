import buildUrl, { UrlOptions } from "./buildUrl";

const fetcher = {
  get: async <T = unknown>(url: string, options?: UrlOptions) => {
    const endpoint = buildUrl(url, options);

    const response = await fetch(endpoint);
    const text = await response.text();

    if (!response.ok) {
      throw new Error(`'${response.statusText}': ${text}`);
    }

    return JSON.parse(text) as T;
  },
};

export default fetcher;
