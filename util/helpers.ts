export function getRandom(arr: string[], n: number) {
  let result: string[] = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export function upperCaseTitle(title: string) {
  return title
    ?.split(" ")
    ?.map((elem) => elem[0]?.toUpperCase() + elem.slice(1))
    .join(" ");
}

export function readableTitle(genre: string) {
  return upperCaseTitle(genre?.replace(/__/gi, " & ").replace(/_/gi, " "));
}

export function sliceText(text: string, limit: number) {
  const l = text.split("").length;
  const limitedText = text.split("").slice(0, limit).join("");
  return l > limit ? limitedText + "..." : limitedText;
}
