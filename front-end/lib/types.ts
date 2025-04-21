export type UserType = {
  id: number;
  email: string;
  fullName?: string;
  phone?: string;
  avatarUrl: string;
  role: RoleType;
};

export type RoleType = {
  id: number;
  name: string;
};

export type BannerType = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

export type ProductType = {
  id: number;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  price: number;
  imageUrl: string;
  images: string[];
  category: CategoryType;
  variants: object;
  createdAt: Date;
  isFeatured?: boolean;
  attributes?: any;
};

export type CategoryType = {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  productQuantity?: number;
};
