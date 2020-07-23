
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class ProductInput {

    @Field({ description: 'Product name' })
    public productName!: string;

    @Field({ description: 'Category Id' })
    public categoryId!: string;

    @Field({ description: 'Is idBreakfast' })
    public idBreakfast!: boolean;

    @Field({ description: 'Is today food' })
    public isTodayFood!: boolean;

    @Field(() => Int, { description: 'Product Price' })
    public price!: number;

    @Field({ description: ' Product description', nullable: true })
    public description?: string;
}
