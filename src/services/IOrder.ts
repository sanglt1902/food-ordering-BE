import { Order } from '../models';

export interface IOrder {
    getAll(): Promise<Order[]>;
    getOrderById(Id: string): Promise<Order>;
    createOrder(order: any): Promise<boolean>;
};
