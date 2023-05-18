import { AboutContent } from "@interfaces/about.interface";

const findAll = async (): Promise<AboutContent[]> => {
  return new Promise((resolve) => {
    const items = Array.from({ length: 12 }, (_, index) => ({
			src: `https://dummyimage.com/72${index}x40${index}`,
			alt: `content ${index + 1}`,
			title: "Chichen Itza",
			subtitle: "SUBTITLE",
			content:
				"Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.",
		}));
    resolve(items);
  });
}

export const aboutService = { findAll };