export interface ProductData {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  category: {
    id: number;
    name: string;
    slug: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
  images: string[];
  slug: string;
}   