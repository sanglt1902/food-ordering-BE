import { OrderDetail } from '../models';

export interface IOrderDetail {
    createOrderDetail(orderDetail: any): Promise<boolean>;
};
