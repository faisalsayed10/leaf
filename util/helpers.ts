import { UseFormSetValue } from "react-hook-form";
import { SearchFormInputs } from "./types";

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

export function refillInputs(
  url: string,
  setQuery: React.Dispatch<React.SetStateAction<String>>,
  setValue: UseFormSetValue<SearchFormInputs>
) {
  const segmentedUrl = url.split("+").map((child) => child.split(/:|=|&/));

  for (let i = 0; i < segmentedUrl.length; i++) {
    switch (segmentedUrl[i][0]) {
      case "q":
        setQuery(decodeURIComponent(segmentedUrl[i][1]));
        break;
      case "inauthor":
        setValue("author", decodeURIComponent(segmentedUrl[i][1]));
        break;
      case "inpublisher":
        setValue("publisher", decodeURIComponent(segmentedUrl[i][1]));
        break;
      case "isbn":
        setValue("isbn", decodeURIComponent(segmentedUrl[i][1]));
        break;
      case "subject":
        setValue("subject", decodeURIComponent(segmentedUrl[i][1]));
        break;
    }
  }
}

export function buildSearchURL(url: string, inputs: SearchFormInputs) {
  const { author, publisher, sort, filter, isbn, subject } = inputs;

  if (author.trim() !== "") {
    url += `+inauthor:${encodeURIComponent(author)}`;
  }

  if (publisher.trim() !== "") {
    url += `+inpublisher:${encodeURIComponent(publisher)}`;
  }

  if (isbn.trim() !== "") {
    url += `+isbn:${isbn}`;
  }

  if (subject.trim() !== "") {
    url += `+subject:${encodeURIComponent(subject)}`;
  }

  switch (filter) {
    case "&printType=books":
      url += "&printType=books";
      break;
    case "&printType=magazines":
      url += "&printType=magazines";
      break;
    case "&filter=ebooks":
      url += "&filter=ebooks";
      break;
    case "&filter=free-ebooks":
      url += "&filter=free-ebooks";
      break;
    case "&filter=paid-ebooks":
      url += "&filter=paid-ebooks";
      break;
    default:
      break;
  }

  switch (sort) {
    case "&orderBy=relevance":
      url += "&orderBy=relevance";
      break;
    case "&orderBy=newest":
      url += "&orderBy=newest";
      break;
    default:
      break;
  }

  return url;
}
