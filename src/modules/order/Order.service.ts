import { logger } from '../../logger';
import { IOrder } from './IOrder';
import { Order, OrderDetail, Product } from '../common/graphql';
import { OrderInput } from './graphql/OrderInput';
import { iProduct, iOrderDetail } from '../common/services';

export class OrderService implements IOrder {
    getAll(): Promise<Order[]> {
        return Order.findAll();
    }
    getOrderById(Id: string): Promise<Order> {
        return Order.findOne({ where: { id: Id }, include: [{ model: OrderDetail }, { model: Product }] });
    }
    async createOrder(order: OrderInput): Promise<boolean> {
        const { shipNote, shipName, shipAddress, shipPhone, orderDetails } = order;
        const orderRes = await Order.create({ shipNote, shipName, shipAddress, shipPhone });
        let totalPrice = 0;

        for (const { productId, productQuantity } of orderDetails) {
            const product = await iProduct.getProductById(productId);

            if (product) {
                totalPrice += product.price;
                await iOrderDetail.createOrderDetail({
                    quantity: productQuantity,
                    unitPrice: product.price,
                    orderId: orderRes.id,
                    productId,
                })
            }
        }

        return !!await Order.update({ totalPrice }, { where: { id: orderRes.id } })

    }
}
