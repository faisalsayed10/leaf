export type SearchResponse = {
  kind: string;
  totalItems: number;
  items: SearchItem[];
};

export type SearchItem = {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
};

export type VolumeInfo = {
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: { type: string; identifier: string }[];
  readingModes: object;
  printType: string;
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: object;
  imageLinks: ImageLinks
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
  pageCount?: string;
  categories?: string[];
};
export type SaleInfo = {
  country: string;
  saleability: string;
  isEbook: boolean;
  listPrice: { amount: number; currencyCode: string };
  retailPrice: { amount: number; currencyCode: string };
  buyLink: string;
  offers: any[];
};

export type AccessInfo = {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: { isAvailable: boolean; acsTokenLink?: string };
  pdf: { isAvailable: boolean; acsTokenLink?: string };
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
};

export type ImageLinks = {
  thumbnail: string
  extraLarge?: string
  large?: string
  medium?: string
  small?: string
}

export type SearchFormInputs = {
  author: string;
  publisher: string;
  isbn: string;
  filter: string;
  sort: string;
};