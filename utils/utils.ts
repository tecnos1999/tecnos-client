
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";


export const determinePath = (path: string) => {
  return path ? `/ui/${path}` : `/ui/`;
};



export const getEmbedLink = (link: string | null): string | null => {
  if (!link) return null;
  const videoIdMatch = link.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
};





export const freeIcons: { name: string; icon: IconDefinition }[] = (() => {
  const uniqueNames = new Set<string>();
  return Object.keys(Icons)
    .filter((key) => key.startsWith("fa"))
    .map((key) => {
      const name = key.replace("fa", "").toLowerCase();
      if (uniqueNames.has(name)) {
        console.warn(`Duplicate icon name detected: ${name}`);
        return null;
      }
      uniqueNames.add(name);
      return { name, icon: Icons[key as keyof typeof Icons] as IconDefinition };
    })
    .filter(Boolean) as { name: string; icon: IconDefinition }[];
})();
