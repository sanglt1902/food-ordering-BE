import {
    Column,
    CreatedAt,
    DataType,
    Default,
    Model,
    PrimaryKey,
    UpdatedAt,
} from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class BaseModel<T extends Model<T>> extends Model<T> {

    @PrimaryKey
    @Field({ description: 'Id' })
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    public id!: string;

    @Field({ description: 'Create At' })
    @CreatedAt
    public createdAt?: Date;

    @Field({ description: 'Update At' })
    @UpdatedAt
    public updatedAt?: Date;
}
