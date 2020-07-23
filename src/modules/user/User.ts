import {
    Column,
    Table,
    Unique,
    HasMany,
} from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';
import { Order } from '../order/Order';
import BaseModel from '../common/BaseModel';

@ObjectType()
@Table
export class User extends BaseModel<User> {

    @Field({ description: 'Email of the user.' })
    @Unique
    @Column
    public email!: string;

    @Column
    public password!: string;
}
