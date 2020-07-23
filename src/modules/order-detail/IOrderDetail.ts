import { OrderDetail } from '../common/graphql';

export interface IOrderDetail {
    createOrderDetail(orderDetail: any): Promise<boolean>;
};
