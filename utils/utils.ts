export const determinePath = (path: string) => {
  return path ? `/ui/${path}` : `/ui/`;
};



export const getEmbedLink = (link: string | null): string | null => {
  if (!link) return null;
  const videoIdMatch = link.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
};
