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
