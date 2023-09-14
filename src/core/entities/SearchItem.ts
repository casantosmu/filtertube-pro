export default interface SearchItem {
  id: string;
  title: string;
  description: string;
  thumbnails: {
    sm: { url: string };
    md: { url: string };
    lg: { url: string };
  };
}
