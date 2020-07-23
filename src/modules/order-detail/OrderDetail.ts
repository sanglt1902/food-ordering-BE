import {
    Column,
    Table,
    ForeignKey,
    DataType,
    BelongsTo,
} from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';
import BaseModel from '../common/BaseModel';
import { Order } from '../order/Order';
import { Product } from '../product/Product';

@ObjectType()
@Table
export class OrderDetail extends BaseModel<OrderDetail> {

    @Field({ description: 'Order Id' })
    @ForeignKey(() => Order)
    @Column(DataType.UUID)
    public orderId!: string;

    @Field({ description: 'Product Id' })
    @ForeignKey(() => Product)
    @Column(DataType.UUID)
    public productId!: string;

    @Field({ description: 'Unit Price' })
    @Column
    public unitPrice!: number;

    @Field({ description: 'Quantity' })
    @Column
    public quantity!: number;

    @BelongsTo(() => Order, 'orderId')
    public order!: Order;

    @BelongsTo(() => Product, 'productId')
    public product!: Product;
}
