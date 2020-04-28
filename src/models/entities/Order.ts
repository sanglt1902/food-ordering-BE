import {
    Column,
    Table,
    HasMany,
    ForeignKey,
    DataType,
    BelongsToMany,
    BelongsTo,
    Default,
} from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';
import BaseModel from '../BaseModel';
import { User } from './User';
import { OrderStatus } from '../constants';
import { OrderDetail } from './OrderDetail';
import { Product } from './Product';

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
