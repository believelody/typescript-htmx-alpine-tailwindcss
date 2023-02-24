export default function(context) {
  const result = Object.entries(context).filter(([key, value]) => typeof value !== "object" && value).map(([key, value]) => {
    if (typeof value === "boolean" && value) {
      return `${key}`;
    }
    return `${key}='${value.toString()}'`
  }).join(" ");
  return result;
}