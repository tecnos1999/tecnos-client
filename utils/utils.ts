export const determinePath = (path: string) => {
  if (typeof window !== "undefined" && window.location.host === "localhost:8080") {
    return path ? `/ui/${path}` : `/ui/`;
  }
  return path;
};


export const getEmbedLink = (link: string | null): string | null => {
  if (!link) return null;
  const videoIdMatch = link.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
};
