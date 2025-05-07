export type AddressType = {
  id: number;
  fullName: string;
  phone: string;
  address: any;
  isDefault: boolean;
};

export type UserType = {
  id: number;
  email: string;
  fullName?: string;
  phone?: string;
  avatarUrl: string;
  role: RoleType;
  addresses?: AddressType[];
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
  imageUrl: string;
  images: string[];
  stock: number;
  category: CategoryType;
  variants: object[];
  createdAt: Date;
  isFeatured?: boolean;
  attributes?: any;
  discount?: any;
  rate?: number;
};

export type CategoryType = {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  productQuantity?: number;
};

export type VariantType = {
  id: number;
  sku: string;
  price: number;
  stock: number;
  attributes?: any;
  imageUrl?: string;
  product?: ProductType;
};

export type CartItemsType = {
  id: number;
  quantity: number;
  isSelected: boolean;
  variant: VariantType;
};

export type ProvinceType = {
  ProvinceID: number;
  ProvinceName: string;
};

export type DistrictType = {
  DistrictID: number;
  DistrictName: string;
};

export type WardType = {
  WardCode: string;
  WardName: string;
};
