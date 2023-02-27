export default function() {
  console.log("Arguments of fn helper : ", arguments);
  return () => console.log(...Object.values(arguments).slice(0, -1));
}