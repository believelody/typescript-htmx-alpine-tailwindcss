const fetchAll = async () => {
  return new Promise((resolve) => {
    resolve(Array(12).map((_, index) => ({
      src: `https://dummyimage.com/72${index}x40${index}`,
      alt: `content ${index + 1}`,
      title: "Chichen Itza",
      subtitle: "SUBTITLE",
      content: "Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche."
    })));
  });
}

export const aboutService = { fetchAll };