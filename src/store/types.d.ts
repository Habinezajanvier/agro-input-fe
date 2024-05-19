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

interface ILocation {
  district: string;
  sector: string;
  village: string;
}

interface OrderData extends ILocation {
  landSize: number;
  products: {
    id: number;
    quantity: number;
  }[];
}

interface ProductState extends IState<Product> {
  product: Product;
}

interface PaginationDTO {
  page: number;
  pageSize: number;
  category?: number;
}

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}
