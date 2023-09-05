export interface UrlOptions {
  path?: string;
  params?: Record<string, string>;
}

export default function buildUrl(url: string, options?: UrlOptions): string {
  const result = options?.path ? new URL(options.path, url) : new URL(url);

  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      result.searchParams.append(key, value);
    });
  }

  return result.toString();
}
