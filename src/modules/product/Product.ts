import {
    Column,
    Table,
    BelongsTo,
    ForeignKey,
    DataType,
    BelongsToMany,
    HasMany,
} from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';
import BaseModel from '../common/BaseModel';
import { Category } from '../category/Category';
import { Order } from '../order/Order';
import { OrderDetail } from '../order-detail/OrderDetail';

@ObjectType()
@Table
export class Product extends BaseModel<Product> {

    @Field({ description: 'Product name' })
    @Column
    public productName!: string;

    @Field({ description: 'Category Id' })
    @ForeignKey(() => Category)
    @Column(DataType.UUID)
    public categoryId!: string;

    @Field({ description: 'Product Price' })
    @Column
    public price!: number;

    @Field({ description: ' Product description' })
    @Column
    public description?: string;

    @Field({ description: 'Product image' })
    @Column
    public imageURL!: string;

    @Field({ description: 'Is idBreakfast' })
    public idBreakfast!: boolean;

    @Field({ description: 'Is today food' })
    public isTodayFood!: boolean;

    @BelongsTo(() => Category, 'categoryId')
    public category!: Category;

    @BelongsToMany(() => Order, () => OrderDetail)
    public orders!: Order[];

}
