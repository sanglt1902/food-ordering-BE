import { IOrderDetail } from './IOrderDetail';
import { OrderDetail } from '../common/graphql';

export class OrderDetailService implements IOrderDetail {
    createOrderDetail(orderDetail: any): Promise<any> {
        return OrderDetail.create(orderDetail);
    }
}
