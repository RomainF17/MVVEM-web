export interface ProductImage {
  id: string;
  url: string;
  position: number;
}

export interface Product {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  price: number | null;
  imageUrl: string | null;
  images: ProductImage[];
  affiliateLink: string | null;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  title: string;
  description: string;
  category: string;
  price: number | null;
  imageUrl: string;
  images: { url: string; position: number }[];
  affiliateLink: string;
  status: 'draft' | 'published';
}
