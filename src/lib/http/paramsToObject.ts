export default function paramsToObject(
  params: URLSearchParams,
): Record<string, string> {
  return Object.fromEntries(params);
}
