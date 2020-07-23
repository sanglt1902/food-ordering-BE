import {
    Column,
    Table,
    HasMany,

    BelongsToMany,
} from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';
import BaseModel from '../common/BaseModel';
import { OrderDetail } from '../order-detail/OrderDetail';
import { Product } from '../product/Product';
import { OrderStatus } from '../common/Constants';


@ObjectType()
@Table
export class Order extends BaseModel<Order> {

    @Field({ description: 'Order status' })
    @Column({ defaultValue: OrderStatus.UNCONFIRMED })
    public status!: OrderStatus;

    @Field({ description: 'Ship address' })
    @Column
    public shipAddress!: string;

    @Field({ description: 'Ship name' })
    @Column
    public shipName!: string;

    @Field({ description: 'Ship phone' })
    @Column
    public shipPhone!: string;

    @Field({ description: 'Ship note' })
    @Column
    public shipNote?: string;

    @Field({ description: 'Total price' })
    @Column
    public totalPrice!: number;

    @HasMany(() => OrderDetail, 'id')
    public orderDetails?: OrderDetail[];

    @BelongsToMany(() => Product, () => OrderDetail)
    public products!: Order[];
}
