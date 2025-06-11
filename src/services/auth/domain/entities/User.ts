export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string | null;
  accountId: string;
  purchaseLists?: string[] | null; // array de listas de compras
  createdAt: Date;
}
