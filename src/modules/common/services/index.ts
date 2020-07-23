import { CategoryService } from '../../category/Category.service';
import { ProductService } from '../../product/Product.service';
import { IProduct } from '../../product/IProduct';
import { ICategory } from '../../category/ICategory';
import { IOrder } from '../../order/IOrder';
import { OrderService } from '../../order/Order.service';
import { IOrderDetail } from '../../order-detail/IOrderDetail';
import { OrderDetailService } from '../../order-detail/OrderDetailService';

export const iProduct: IProduct = new ProductService();
export const iCategory: ICategory = new CategoryService();
export const iOrder: IOrder = new OrderService();
export const iOrderDetail: IOrderDetail = new OrderDetailService();
