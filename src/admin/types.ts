export interface Article {
  id: string;
  title: string;
  summary: string | null;
  category: string | null;
  tags: string | null;
  coverImageUrl: string | null;
  contentMarkdown: string | null;
  address: string | null;
  status: 'draft' | 'published';
  authorEmail: string | null;
  publishedAt: string | null;
  updatedAt: string;
}

export interface ArticleFormData {
  title: string;
  summary: string;
  category: string;
  tags: string[];
  coverImageUrl: string;
  contentMarkdown: string;
  address: string;
  status: 'draft' | 'published';
}
