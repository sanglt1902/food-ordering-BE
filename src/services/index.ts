import { CategoryService } from './CategoryService';
import { ProductService } from './ProductService';
import { IProduct } from './IProduct';
import { ICategory } from './ICategory';
import { IOrder } from './IOrder';
import { OrderService } from './OrderService';
import { IOrderDetail } from './IOrderDetail';
import { OrderDetailService } from './OrderDetailService';

export const iProduct: IProduct = new ProductService();
export const iCategory: ICategory = new CategoryService();
export const iOrder: IOrder = new OrderService();
export const iOrderDetail: IOrderDetail = new OrderDetailService();
