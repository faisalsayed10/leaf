export type Subject = {
  key: string;
  name: string;
  subject_type: string;
  work_count: number;
  works: Work[];
  ebook_count: number;
};

export type SubjectExtended = Subject & {
  authors: Author[];
};

export type SubjectsData = {
  name: string;
  value: Subject;
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
  name: string;
  count?: number;
};
