interface ReturnData<T> {
  content: T[];
  count: number;
  pages?: number;
}

interface Payload<T> {
  error: boolean;
  message: string;
  data?: T | ResponseData<T>;
}

interface Product {
  id: number | string;
  price: number | string;
  name: string;
  available: number;
  type: ProductType;
  picture?: string;
  avatars?: string[];
  createdBy?: number;
}

interface IState<T> {
  loading: boolean;
  error: boolean;
  success: boolean;
  message: string;
  data: ReturnData<T>;
}

interface ProductState extends IState<Product> {
  product: Product;
}

interface PaginationDTO {
  page: number;
  pageSize: number;
  category?: number;
}
