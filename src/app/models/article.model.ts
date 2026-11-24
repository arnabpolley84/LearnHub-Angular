export type ArticleCategory =
  | 'Angular'
  | 'TypeScript'
  | 'Web Design'
  | 'Computer Science'
  | 'Study Skills';

export interface Article {
  id: string;
  title: string;
  author: string;
  category: ArticleCategory;
  description: string;
  content: string;
  imageUrl: string;
  publishedDate: string;
  readTimeMinutes: number;
  featured?: boolean;
  isUserCreated?: boolean;
}

export interface NewArticleInput {
  title: string;
  author: string;
  category: ArticleCategory;
  description: string;
  content: string;
  imageUrl?: string;
}

export interface CoverImagePreset {
  label: string;
  url: string;
  category: ArticleCategory;
}
