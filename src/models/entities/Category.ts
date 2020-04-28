import {
    Column,
    Table,
    HasMany,
} from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';
import { Product } from './Product';
import BaseModel from '../BaseModel';

@ObjectType()
@Table
export class Category extends BaseModel<Category> {

    @Field({ description: 'Category name' })
    @Column
    public categoryName!: string;

    @HasMany(() => Product, 'id')
    public products?: Product[];
}
