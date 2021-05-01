export type Genre = {
  key: string;
  name: string;
  subject_type: string;
  work_count: number;
  works: Work[];
  ebook_count: number;
};

export type GenreExtended = Genre & {
  authors: Author[];
};

export type GenresData = {
  name: string;
  value: Genre;
};

export type Work = {
  key: string;
  title: string;
  edition_count: number;
  cover_id: number;
  cover_edition_key: string;
  subject: string[];
  ia_collection: string[];
  lendinglibrary: boolean;
  printdisabled: boolean;
  lending_edition: string;
  lending_identifier: string;
  authors: Author[];
  first_publish_year: number | null;
  ia: string;
  public_scan: boolean;
  has_fulltext: boolean;
  checked_out: boolean;
  availability: any;
};

export type Author = {
  key: string;
  name?: string;
  count?: number;
};

export type Book = {
  authors?: Author[];
  publishers?: string[];
  number_of_pages: number;
  isbn_10?: string[];
  covers: number[];
  last_modified: { type: string; value: string };
  first_sentence: { type: string; value: string };
  latest_revision: number;
  revision: number;
  key: string;
  ocaid: string;
  contributions: string[];
  title: string;
  publish_date: string;
  description: string;
  subject_places: string[];
  subjects: string[];
  subject_people: string[];
  created: { type: string; value: string };
};
