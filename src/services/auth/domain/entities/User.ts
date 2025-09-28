export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string | null;
  userId: string;
  plan: string;
  createdAt: Date;
}
